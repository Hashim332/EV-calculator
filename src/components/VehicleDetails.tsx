import React from "react";
import type { Vehicle } from "../types";
import type { Currency } from "./CurrencyConverter";

interface VehicleDetailsProps {
  vehicle?: Vehicle;
  type: "ev" | "ice";
  periodMonths: number;
  electricityPrice?: number; // £/kWh, only for EV
  fuelPrice?: number; // £/Litre, only for ICE
  mode?: "buy" | "lease"; // Add mode prop
  selectedCurrency?: Currency;
  formatCurrency?: (amount: number) => string;
}

// Tooltip component for hoverable info
const Tooltip: React.FC<{ message: string; children: React.ReactNode }> = ({
  message,
  children,
}) => (
  <div className="relative group inline-block">
    {children}
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex z-20">
      <span className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg transition-all opacity-90">
        {message}
      </span>
    </div>
  </div>
);

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  vehicle,
  type,
  periodMonths,
  electricityPrice = 0.3,
  fuelPrice = 1.45,
  mode = type === "ev" ? "lease" : "buy", // default fallback
  selectedCurrency = "GBP",
  formatCurrency = (amount: number) => `£${amount.toLocaleString()}`,
}) => {
  if (!vehicle) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
        <div className="w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center">
          <span className="text-sm">
            Select a {type === "ev" ? "EV" : "ICE Car"}
          </span>
        </div>
      </div>
    );
  }

  // Determine if this mode is supported for this vehicle type
  const isSupported =
    (type === "ev" && mode === "lease") || (type === "ice" && mode === "buy");

  // Calculate depreciation based on band and time period
  const calculateDepreciatedValue = (
    initialValue: number,
    depreciationBand: string,
    years: number
  ): number => {
    // Non-linear depreciation model: Value(t) = Initial * (Final/Initial)^(t/3)
    // High depreciation: 60% value remaining after 3 years (40% depreciation)
    // Low depreciation: 77.5% value remaining after 3 years (22.5% depreciation)

    const threeYearRetentionRate =
      depreciationBand.toLowerCase() === "high" ? 0.6 : 0.775;
    const retentionRate = Math.pow(threeYearRetentionRate, years / 3);

    return Math.round(initialValue * retentionRate);
  };

  // Calculations based on new schema
  const lease = vehicle.lease_monthly || 0;
  const maintenanceMonthly = vehicle.maintenance_gbp_per_year
    ? Math.round(vehicle.maintenance_gbp_per_year / 12)
    : 0;
  const purchase = Number(vehicle.msrp_gbp) || 0;
  const years = periodMonths / 12;
  const resale =
    type === "ice"
      ? calculateDepreciatedValue(
          purchase,
          vehicle.depreciation_band || "high",
          years
        )
      : 0;

  // Calculate electricity cost for EVs based on 10,000 miles per year
  const calculateElectricityCost = () => {
    if (type !== "ev" || !vehicle.efficiency_mpkwh) return 0;

    const milesPerYear = 10000;
    const kWhPerYear = milesPerYear / vehicle.efficiency_mpkwh;
    const electricityPricePerKWh = electricityPrice; // Use prop
    const annualElectricityCost = kWhPerYear * electricityPricePerKWh;

    return Math.round(annualElectricityCost / 12); // Monthly cost
  };

  // Calculate fuel cost for ICE cars based on 10,000 miles per year
  const calculateFuelCost = () => {
    if (type !== "ice" || !vehicle.efficiency_mpg) return 0;

    const milesPerYear = 10000;
    const gallonsPerYear = milesPerYear / vehicle.efficiency_mpg;

    // Handle different fuel price units based on currency
    let fuelPricePerGallon;
    if (selectedCurrency === "USD") {
      // For USD, input is already in $/Gallon
      fuelPricePerGallon = fuelPrice;
    } else {
      // For GBP and EUR, input is in £/Litre or €/Litre, convert to per gallon
      // UK gallon = 4.54609 litres
      fuelPricePerGallon = fuelPrice * 4.54609;
    }

    const annualFuelCost = gallonsPerYear * fuelPricePerGallon;

    return Math.round(annualFuelCost / 12); // Monthly cost
  };

  const electricityMonthly = calculateElectricityCost();
  const fuelMonthly = calculateFuelCost();

  let totalCost = 0;
  let costDetails = null;

  if (type === "ev") {
    totalCost =
      lease * periodMonths +
      maintenanceMonthly * periodMonths +
      electricityMonthly * periodMonths;
    costDetails = (
      <>
        <li>
          <Tooltip message={`${formatCurrency(lease * periodMonths)} total`}>
            Lease: {formatCurrency(lease)}/mo
          </Tooltip>
        </li>
        <li>
          <Tooltip
            message={`${formatCurrency(
              electricityMonthly * periodMonths
            )} total`}
          >
            Electricity: {formatCurrency(electricityMonthly)}/mo
          </Tooltip>
        </li>
        <li>
          <Tooltip
            message={`${formatCurrency(
              maintenanceMonthly * periodMonths
            )} total`}
          >
            Maintenance: {formatCurrency(maintenanceMonthly)}/mo
          </Tooltip>
        </li>
      </>
    );
  } else {
    totalCost =
      purchase -
      resale +
      fuelMonthly * periodMonths +
      maintenanceMonthly * periodMonths;
    const depreciationAmount = purchase - resale;
    // Calculate % drop for depreciation band
    const band = vehicle.depreciation_band || "unknown";
    let bandDrop = "";
    if (band.toLowerCase() === "high") bandDrop = "(40% drop)";
    else if (band.toLowerCase() === "low") bandDrop = "(22.5% drop)";
    costDetails = (
      <>
        <li>Purchase Price: {formatCurrency(purchase)}</li>
        <li>
          Resale ({years}yr): {formatCurrency(resale)}
        </li>
        <li>Depreciation: {formatCurrency(depreciationAmount)}</li>
        <li>
          <Tooltip
            message={`${formatCurrency(fuelMonthly * periodMonths)} total`}
          >
            Fuel: {formatCurrency(fuelMonthly)}/mo
          </Tooltip>
        </li>
        <li>
          <Tooltip
            message={`${formatCurrency(
              maintenanceMonthly * periodMonths
            )} total`}
          >
            Maintenance: {formatCurrency(maintenanceMonthly)}/mo
          </Tooltip>
        </li>
        <li className="text-xs text-gray-500 pt-1">
          Depreciation band: {band}{" "}
          {bandDrop && <span className="ml-1">{bandDrop}</span>}
        </li>
      </>
    );
  }

  const [imgError, setImgError] = React.useState(false);

  return (
    <>
      <div className="w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center p-4 mx-auto">
        {vehicle.image_url && !imgError ? (
          <img
            src={vehicle.image_url}
            alt={vehicle.make + " " + vehicle.model}
            className="object-contain h-full w-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            {vehicle.image_url && imgError
              ? "Image not available"
              : type === "ev"
              ? "No EV image"
              : "No ICE image"}
          </div>
        )}
      </div>
      <div className="text-center mb-3">
        <div className="font-semibold text-base">
          {vehicle.make} {vehicle.model}
        </div>
        <div className="text-xs text-gray-500">
          {type === "ev" && vehicle.max_range
            ? `Range: ${vehicle.max_range} miles`
            : null}
          {type === "ice" && vehicle.efficiency_mpg
            ? `MPG: ${vehicle.efficiency_mpg}`
            : null}
        </div>
      </div>
      {/* Only show cost details if mode is supported */}
      {isSupported ? (
        <>
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            {costDetails}
          </ul>
          <div
            className={`w-full rounded p-4 md:p-6 text-center mt-auto ${
              type === "ev" ? "bg-violet-100" : "bg-orange-100"
            }`}
          >
            <div className="font-semibold text-sm">
              Estimated {years}-Year Total Cost
            </div>
            <div
              className={`text-lg font-bold ${
                type === "ev" ? "text-violet-700" : "text-orange-700"
              }`}
            >
              {formatCurrency(totalCost)}
            </div>
            <div className="text-xs text-gray-500">
              {type === "ev"
                ? "(Lease + Electricity + Maintenance)"
                : "(Depreciation + Fuel + Maintenance)"}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full rounded p-4 md:p-6 text-center mt-auto bg-gray-100 text-gray-500">
          {type === "ev" && mode === "buy"
            ? "Buying EVs is not supported yet."
            : type === "ice" && mode === "lease"
            ? "Leasing ICE vehicles is not supported yet."
            : null}
        </div>
      )}
    </>
  );
};

export default VehicleDetails;
