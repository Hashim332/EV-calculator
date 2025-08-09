import type { Vehicle } from "../types";
import type { Currency } from "../components/CurrencyConverter";

export interface VehicleCostInputs {
  vehicle: Vehicle;
  type: "ev" | "ice";
  periodMonths: number;
  electricityPrice: number; // price per kWh
  fuelPrice: number; // £/Litre or €/Litre; $/Gallon when currency is USD
  selectedCurrency: Currency;
  mode: "buy" | "lease";
}

export interface VehicleCostBreakdown {
  // Support
  isSupported: boolean;

  // Time horizon
  years: number;

  // Inputs derived to monthlies
  leaseMonthly: number;
  maintenanceMonthly: number;

  // Running costs
  electricityMonthly: number; // EV
  fuelMonthly: number; // ICE

  // Total for the selected horizon and type
  totalCost: number;
}

export interface VehicleInfo {
  // Purchase and depreciation (intrinsic vehicle info)
  purchasePrice: number;
  resaleValue: number;
  depreciationAmount: number;
  depreciationBand: string | undefined;
  depreciationBandLabel: string; // e.g., "(40% drop)" | "(22.5% drop)" | ""
}

// Flow overview:
// 1) Derive years from the selected period. 2) Compute maintenance monthly.
// 3) For ICE, compute resale via non-linear depreciation (banded) and depreciation amount.
// 4) For EV, compute electricity monthly from 10k miles/year and efficiency; for ICE, fuel monthly similarly (convert litre→gallon unless USD).
// 5) Aggregate totals: EV = lease + electricity + maintenance; ICE = (purchase - resale) + fuel + maintenance. All totals are for the full period.

const MILES_PER_YEAR = 10000;

function calculateDepreciatedValue(
  initialValue: number,
  depreciationBand: string,
  years: number
): number {
  const threeYearRetentionRate =
    depreciationBand.toLowerCase() === "high" ? 0.6 : 0.775;
  const retentionRate = Math.pow(threeYearRetentionRate, years / 3);
  return Math.round(initialValue * retentionRate);
}

export function calculateVehicleCosts(inputs: VehicleCostInputs): {
  breakdown: VehicleCostBreakdown;
  vehicleInfo: VehicleInfo;
} {
  const {
    vehicle,
    type,
    periodMonths,
    electricityPrice,
    fuelPrice,
    selectedCurrency,
    mode,
  } = inputs;

  const isSupported =
    (type === "ev" && mode === "lease") || (type === "ice" && mode === "buy");

  const years = periodMonths / 12;

  const leaseMonthly = vehicle.lease_monthly || 0;
  const maintenanceMonthly = vehicle.maintenance_gbp_per_year
    ? Math.round(vehicle.maintenance_gbp_per_year / 12)
    : 0;

  const purchasePrice = Number(vehicle.msrp_gbp) || 0;

  const depreciationBand = vehicle.depreciation_band;
  const resaleValue =
    type === "ice"
      ? calculateDepreciatedValue(
          purchasePrice,
          depreciationBand || "high",
          years
        )
      : 0;
  const depreciationAmount = type === "ice" ? purchasePrice - resaleValue : 0;

  let depreciationBandLabel = "";
  if (depreciationBand) {
    const lowered = depreciationBand.toLowerCase();
    if (lowered === "high") depreciationBandLabel = "(40% drop)";
    else if (lowered === "low") depreciationBandLabel = "(22.5% drop)";
  }

  // Electricity monthly (EV)
  let electricityMonthly = 0;
  if (type === "ev" && vehicle.efficiency_mpkwh) {
    const kWhPerYear = MILES_PER_YEAR / vehicle.efficiency_mpkwh;
    const annualElectricityCost = kWhPerYear * electricityPrice;
    electricityMonthly = Math.round(annualElectricityCost / 12);
  }

  // Fuel monthly (ICE)
  let fuelMonthly = 0;
  if (type === "ice" && vehicle.efficiency_mpg) {
    const gallonsPerYear = MILES_PER_YEAR / vehicle.efficiency_mpg;
    let fuelPricePerGallon: number;
    if (selectedCurrency === "USD") {
      fuelPricePerGallon = fuelPrice; // already $/Gallon
    } else {
      fuelPricePerGallon = fuelPrice * 4.54609; // Litre → UK Gallon
    }
    const annualFuelCost = gallonsPerYear * fuelPricePerGallon;
    fuelMonthly = Math.round(annualFuelCost / 12);
  }

  let totalCost = 0;
  if (type === "ev") {
    totalCost =
      leaseMonthly * periodMonths +
      maintenanceMonthly * periodMonths +
      electricityMonthly * periodMonths;
  } else {
    totalCost =
      purchasePrice -
      resaleValue +
      fuelMonthly * periodMonths +
      maintenanceMonthly * periodMonths;
  }

  const breakdown: VehicleCostBreakdown = {
    isSupported,
    years,
    leaseMonthly,
    maintenanceMonthly,
    electricityMonthly,
    fuelMonthly,
    totalCost,
  };

  const vehicleInfo: VehicleInfo = {
    purchasePrice,
    resaleValue,
    depreciationAmount,
    depreciationBand,
    depreciationBandLabel,
  };

  return { breakdown, vehicleInfo };
}
