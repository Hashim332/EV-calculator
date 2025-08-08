import React from "react";
import type { Vehicle } from "../types";
import type { Currency } from "./CurrencyConverter";
import { X } from "lucide-react";
import { calculateVehicleCosts } from "../utils/calculateVehicleCosts";

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
function Tooltip({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row justify-between border p-2 rounded-md items-center">
      <div className="relative group ">
        {children}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex z-20">
          <span className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg transition-all opacity-90">
            {message}
          </span>
        </div>
      </div>
      <div className="px-2 hover:cursor-pointer">
        <X className="w-4 h-4 hover:text-red-500" />
      </div>
    </div>
  );
}

function VehicleDetails({
  vehicle,
  type,
  periodMonths,
  electricityPrice = 0.3,
  fuelPrice = 1.45,
  mode = type === "ev" ? "lease" : "buy", // default fallback
  selectedCurrency = "GBP",
  formatCurrency = (amount: number) => `£${amount.toLocaleString()}`,
}: VehicleDetailsProps) {
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

  const breakdown = calculateVehicleCosts({
    vehicle,
    type,
    periodMonths,
    electricityPrice,
    fuelPrice,
    selectedCurrency,
    mode,
  });

  const {
    isSupported,
    years,
    leaseMonthly,
    maintenanceMonthly,
    purchasePrice,
    resaleValue,
    depreciationAmount,
    depreciationBand,
    depreciationBandLabel,
    electricityMonthly,
    fuelMonthly,
    totalCost,
  } = breakdown;

  let costDetails = null as React.ReactNode;
  if (type === "ev") {
    costDetails = (
      <>
        <li>
          <Tooltip
            message={`${formatCurrency(leaseMonthly * periodMonths)} total`}
          >
            Lease: {formatCurrency(leaseMonthly)}/mo
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
    costDetails = (
      <>
        <li>Purchase Price: {formatCurrency(purchasePrice)}</li>
        <li>
          Resale ({years}yr): {formatCurrency(resaleValue)}
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
          Depreciation band: {depreciationBand || "unknown"}{" "}
          {depreciationBandLabel && (
            <span className="ml-1">{depreciationBandLabel}</span>
          )}
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
}

export default VehicleDetails;
