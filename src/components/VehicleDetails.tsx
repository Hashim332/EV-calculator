import React from "react";
import type { Vehicle } from "../types";
import type { Currency } from "./CurrencyConverter";
import VehicleCostList from "./VehicleCostList";
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

// extracted tooltip wrapper component in `ListItemWithTooltip`

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

  const { breakdown, vehicleInfo } = calculateVehicleCosts({
    vehicle,
    type,
    periodMonths,
    electricityPrice,
    fuelPrice,
    selectedCurrency,
    mode,
  });

  const { isSupported, years, totalCost } = breakdown;

  // TODO: ADD STATE FOR TRACKING SELECTED COSTS
  // const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

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
          <VehicleCostList
            type={type}
            breakdown={breakdown}
            vehicleInfo={vehicleInfo}
            periodMonths={periodMonths}
            formatCurrency={formatCurrency}
          />

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
