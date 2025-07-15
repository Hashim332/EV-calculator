import React from "react";
import VehicleDropdown from "./VehicleDropdown";
import VehicleDetails from "./VehicleDetails";
import type { Vehicle } from "../types";

interface VehicleComparisonSectionProps {
  vehicles: Vehicle[];
  selectedEV: string | null;
  setSelectedEV: (id: string | null) => void;
  selectedPetrol: string | null;
  setSelectedPetrol: (id: string | null) => void;
  periodMonths: number;
}

const VehicleComparisonSection: React.FC<VehicleComparisonSectionProps> = ({
  vehicles,
  selectedEV,
  setSelectedEV,
  selectedPetrol,
  setSelectedPetrol,
  periodMonths,
}) => (
  <section className="w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 mb-6 md:mb-8">
    {/* EV Column */}
    <div className="flex-1 bg-violet-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]">
      <VehicleDropdown
        vehicles={vehicles.filter(
          (v) => v.fuel_type && v.fuel_type.toLowerCase() === "electric"
        )}
        selectedId={selectedEV}
        onSelect={setSelectedEV}
        label="Select EV"
        className="text-violet-700"
      />
      <VehicleDetails
        vehicle={vehicles.find((v) => v.uuid === selectedEV)}
        type="ev"
        periodMonths={periodMonths}
      />
    </div>
    {/* Petrol Column */}
    <div className="flex-1 bg-orange-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]">
      <VehicleDropdown
        vehicles={vehicles.filter(
          (v) => v.fuel_type && v.fuel_type.toLowerCase() !== "electric"
        )}
        selectedId={selectedPetrol}
        onSelect={setSelectedPetrol}
        label="Select Petrol Car"
        className="text-orange-700"
      />
      <VehicleDetails
        vehicle={vehicles.find((v) => v.uuid === selectedPetrol)}
        type="ice"
        periodMonths={periodMonths}
      />
    </div>
  </section>
);

export default VehicleComparisonSection;
