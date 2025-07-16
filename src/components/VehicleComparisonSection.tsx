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
}) => {
  // State for user-input prices
  const [electricityPrice, setElectricityPrice] = React.useState(0.3); // £/kWh
  const [fuelPrice, setFuelPrice] = React.useState(1.45); // £/Litre

  return (
    <section className='w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 mb-6 md:mb-8'>
      {/* EV Column */}
      <div className='flex-1 bg-violet-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]'>
        {/* Electricity price input */}
        <div className='mb-3 flex flex-col items-center w-full'>
          <label className='text-xs text-gray-600 mb-1'>
            Electricity Price (£/kWh):
            <input
              type='number'
              min='0'
              step='0.01'
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(Number(e.target.value))}
              className='ml-2 border rounded px-2 py-1 text-sm w-24'
            />
          </label>
        </div>
        <VehicleDropdown
          vehicles={vehicles.filter(
            (v) => v.fuel_type && v.fuel_type.toLowerCase() === "electric"
          )}
          selectedId={selectedEV}
          onSelect={setSelectedEV}
          label='Select EV'
          className='text-violet-700'
        />
        <VehicleDetails
          vehicle={vehicles.find((v) => v.uuid === selectedEV)}
          type='ev'
          periodMonths={periodMonths}
          electricityPrice={electricityPrice}
        />
      </div>
      {/* Petrol Column */}
      <div className='flex-1 bg-orange-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]'>
        {/* Fuel price input */}
        <div className='mb-3 flex flex-col items-center w-full'>
          <label className='text-xs text-gray-600 mb-1'>
            Fuel Price (£/Litre):
            <input
              type='number'
              min='0'
              step='0.01'
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className='ml-2 border rounded px-2 py-1 text-sm w-24'
            />
          </label>
        </div>
        <VehicleDropdown
          vehicles={vehicles.filter(
            (v) => v.fuel_type && v.fuel_type.toLowerCase() !== "electric"
          )}
          selectedId={selectedPetrol}
          onSelect={setSelectedPetrol}
          label='Select Petrol Car'
          className='text-orange-700'
        />
        <VehicleDetails
          vehicle={vehicles.find((v) => v.uuid === selectedPetrol)}
          type='ice'
          periodMonths={periodMonths}
          fuelPrice={fuelPrice}
        />
      </div>
    </section>
  );
};

export default VehicleComparisonSection;
