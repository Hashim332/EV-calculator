import VehicleCostListItem from "./VehiceCostListItem";
import type {
  VehicleCostBreakdown,
  VehicleInfo,
} from "../utils/calculateVehicleCosts";
import { useState } from "react";

/**
 * Missing logic you may want to add:
 * - Wire up the X button in `VehicleCostListItem` to remove/hide rows.
 *   For example, lift state to the parent to track excluded costs
 *   and pass an `onRemove(key)` handler to each row.
 */

interface VehicleCostListProps {
  type: "ev" | "ice";
  breakdown: VehicleCostBreakdown;
  vehicleInfo: VehicleInfo;
  periodMonths: number;
  formatCurrency: (amount: number) => string;
}

function VehicleCostList({
  type,
  breakdown,
  vehicleInfo,
  periodMonths,
  formatCurrency,
}: VehicleCostListProps) {
  // selected costs -> map -> <vehiclecostlistitem />
  // remove -> update selected costs -> rerender

  const {
    years,
    leaseMonthly,
    maintenanceMonthly,
    electricityMonthly,
    fuelMonthly,
  } = breakdown;

  console.log("breakdown", breakdown);

  const {
    purchasePrice,
    resaleValue,
    depreciationAmount,
    depreciationBand,
    depreciationBandLabel,
  } = vehicleInfo;

  //   const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

  if (type === "ev") {
    return (
      <ul className="text-sm text-gray-700 space-y-1 mb-4">
        <VehicleCostListItem
          message={`${formatCurrency(leaseMonthly * periodMonths)} total`}
          section="ev"
        >
          Lease: {formatCurrency(leaseMonthly)}/mo
        </VehicleCostListItem>
        <VehicleCostListItem
          message={`${formatCurrency(electricityMonthly * periodMonths)} total`}
          section="ev"
        >
          Electricity: {formatCurrency(electricityMonthly)}/mo
        </VehicleCostListItem>
        <VehicleCostListItem
          message={`${formatCurrency(maintenanceMonthly * periodMonths)} total`}
          section="ev"
        >
          Maintenance: {formatCurrency(maintenanceMonthly)}/mo
        </VehicleCostListItem>
      </ul>
    );
  }

  return (
    <ul className="text-sm text-gray-700 space-y-1 mb-4">
      <VehicleCostListItem section="ice">
        Purchase Price: {formatCurrency(purchasePrice)}
      </VehicleCostListItem>
      <VehicleCostListItem section="ice">
        Resale ({years}yr): {formatCurrency(resaleValue)}
      </VehicleCostListItem>
      <VehicleCostListItem section="ice">
        Depreciation: {formatCurrency(depreciationAmount)}
      </VehicleCostListItem>
      <VehicleCostListItem
        message={`${formatCurrency(fuelMonthly * periodMonths)} total`}
        section="ice"
      >
        Fuel: {formatCurrency(fuelMonthly)}/mo
      </VehicleCostListItem>
      <VehicleCostListItem
        message={`${formatCurrency(maintenanceMonthly * periodMonths)} total`}
        section="ice"
      >
        Maintenance: {formatCurrency(maintenanceMonthly)}/mo
      </VehicleCostListItem>
      <li className="text-xs text-gray-500 pt-1">
        Depreciation band: {depreciationBand || "unknown"}{" "}
        {depreciationBandLabel && (
          <span className="ml-1">{depreciationBandLabel}</span>
        )}
      </li>
    </ul>
  );
}

export default VehicleCostList;
