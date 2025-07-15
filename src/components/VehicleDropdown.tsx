import React from "react";
import type { Vehicle } from "../types";

interface VehicleDropdownProps {
  vehicles: Vehicle[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  label: string;
  className?: string;
}

const VehicleDropdown: React.FC<VehicleDropdownProps> = ({
  vehicles,
  selectedId,
  onSelect,
  label,
  className = "",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelect(selectedValue === "" ? null : selectedValue);
  };

  // Define the fixed segment order
  const SEGMENT_ORDER = ["Saloon", "SUV-SMALL", "SUV-LARGE"];

  // Group vehicles by segment
  const groupedVehicles = vehicles.reduce((groups, vehicle) => {
    const segment = vehicle.segment || "Other";
    if (!groups[segment]) {
      groups[segment] = [];
    }
    groups[segment].push(vehicle);
    return groups;
  }, {} as Record<string, Vehicle[]>);

  // Get all unique segments
  const allSegments = Object.keys(groupedVehicles);
  // Sort segments: fixed order first, then the rest alphabetically
  const sortedSegments = [
    ...SEGMENT_ORDER.filter((seg) => allSegments.includes(seg)),
    ...allSegments.filter((seg) => !SEGMENT_ORDER.includes(seg)).sort(),
  ];

  return (
    <div className={`mb-4 md:mb-6 ${className}`}>
      <label className="mb-2 font-medium text-sm block text-center w-full">
        {label}
      </label>
      <select
        value={selectedId || ""}
        onChange={handleChange}
        className="p-3 md:p-4 rounded border w-full text-sm"
      >
        <option value="">Select a vehicle</option>
        {vehicles && vehicles.length > 0
          ? sortedSegments.map((segment) => (
              <optgroup key={segment} label={segment}>
                {groupedVehicles[segment].map((vehicle) => (
                  <option key={vehicle.uuid} value={vehicle.uuid}>
                    {vehicle.make} {vehicle.model}
                  </option>
                ))}
              </optgroup>
            ))
          : null}
      </select>
    </div>
  );
};

export default VehicleDropdown;
