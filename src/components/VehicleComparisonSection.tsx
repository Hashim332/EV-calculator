import React from "react";
import VehicleDropdown from "./VehicleDropdown";
import VehicleDetails from "./VehicleDetails";
import type { Vehicle } from "../types";
import type { Currency } from "./CurrencyConverter";

// Custom ModeButton component for consistent buy/lease styling
interface ModeButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  colorScheme: "purple" | "orange";
  className?: string;
}

const ModeButton: React.FC<ModeButtonProps> = ({
  children,
  isSelected,
  onClick,
  colorScheme,
  className = "",
}) => {
  const baseClasses =
    "w-24 px-4 py-2 rounded-md text-sm font-medium transition-colors border";

  const colorClasses = {
    purple: {
      selected: "bg-violet-600 text-white border-violet-600 shadow",
      unselected:
        "bg-white text-violet-700 border-violet-200 hover:bg-violet-50",
    },
    orange: {
      selected: "bg-orange-500 text-white border-orange-500 shadow",
      unselected:
        "bg-white text-orange-700 border-orange-200 hover:bg-orange-50",
    },
  };

  const appliedClasses = isSelected
    ? colorClasses[colorScheme].selected
    : colorClasses[colorScheme].unselected;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${appliedClasses} ${className}`}
      aria-pressed={isSelected}
    >
      {children}
    </button>
  );
};

interface VehicleComparisonSectionProps {
  vehicles: Vehicle[];
  selectedEV: string | null;
  setSelectedEV: (id: string | null) => void;
  selectedPetrol: string | null;
  setSelectedPetrol: (id: string | null) => void;
  periodMonths: number;
  selectedCurrency: Currency;
  formatCurrency: (amount: number) => string;
}

const VehicleComparisonSection: React.FC<VehicleComparisonSectionProps> = ({
  vehicles,
  selectedEV,
  setSelectedEV,
  selectedPetrol,
  setSelectedPetrol,
  periodMonths,
  selectedCurrency,
  formatCurrency,
}) => {
  // State for user-input prices
  const [electricityPrice, setElectricityPrice] = React.useState(0.3); // £/kWh
  const [fuelPrice, setFuelPrice] = React.useState(1.45); // £/Litre

  // Update fuel price when currency changes to appropriate defaults
  React.useEffect(() => {
    if (selectedCurrency === "USD") {
      setFuelPrice(3.5); // Typical US gas price in $/gallon
      setElectricityPrice(0.12); // Typical US electricity price in $/kWh
    } else if (selectedCurrency === "EUR") {
      setFuelPrice(1.6); // Typical EU gas price in €/litre
      setElectricityPrice(0.25); // Typical EU electricity price in €/kWh
    } else {
      setFuelPrice(1.45); // Typical UK gas price in £/litre
      setElectricityPrice(0.3); // Typical UK electricity price in £/kWh
    }
  }, [selectedCurrency]);

  // State for buy/lease selection
  const [evMode, setEvMode] = React.useState<"buy" | "lease">("lease");
  const [petrolMode, setPetrolMode] = React.useState<"buy" | "lease">("buy");

  // Always pass the selected vehicle, but also pass the mode
  const selectedEvVehicle: Vehicle | undefined = vehicles.find(
    (v) => v.uuid === selectedEV
  );
  const selectedPetrolVehicle: Vehicle | undefined = vehicles.find(
    (v) => v.uuid === selectedPetrol
  );

  return (
    <section className="w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 mb-6 md:mb-8">
      {/* EV Column */}
      <div className="flex-1 bg-violet-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]">
        {/* Buy/Lease selection UI (EV) */}
        <div className="mb-3 flex flex-row gap-2 w-full justify-center">
          <ModeButton
            isSelected={evMode === "buy"}
            onClick={() => setEvMode("buy")}
            colorScheme="purple"
          >
            Buy
          </ModeButton>
          <ModeButton
            isSelected={evMode === "lease"}
            onClick={() => setEvMode("lease")}
            colorScheme="purple"
          >
            Lease
          </ModeButton>
        </div>
        {/* Electricity price input */}
        <div className="mb-3 flex flex-col items-center w-full">
          <label className="text-xs text-gray-600 mb-1">
            Electricity Price (
            {selectedCurrency === "GBP"
              ? "£"
              : selectedCurrency === "EUR"
              ? "€"
              : "$"}
            /kWh):
            <input
              type="number"
              min="0"
              step="0.01"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1 text-sm w-24"
            />
          </label>
        </div>
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
          vehicle={selectedEvVehicle}
          type="ev"
          periodMonths={periodMonths}
          electricityPrice={electricityPrice}
          mode={evMode}
          selectedCurrency={selectedCurrency}
          formatCurrency={formatCurrency}
        />
      </div>
      {/* Petrol Column */}
      <div className="flex-1 bg-orange-50 rounded-xl p-4 md:p-8 flex flex-col items-center min-h-[340px]">
        {/* Buy/Lease selection UI (Petrol) */}
        <div className="mb-3 flex flex-row gap-2 w-full justify-center">
          <ModeButton
            isSelected={petrolMode === "buy"}
            onClick={() => setPetrolMode("buy")}
            colorScheme="orange"
          >
            Buy
          </ModeButton>
          <ModeButton
            isSelected={petrolMode === "lease"}
            onClick={() => setPetrolMode("lease")}
            colorScheme="orange"
          >
            Lease
          </ModeButton>
        </div>
        {/* Fuel price input */}
        <div className="mb-3 flex flex-col items-center w-full">
          <label className="text-xs text-gray-600 mb-1">
            Fuel Price (
            {selectedCurrency === "GBP"
              ? "£"
              : selectedCurrency === "EUR"
              ? "€"
              : "$"}
            /{selectedCurrency === "USD" ? "Gallon" : "Litre"}):
            <input
              type="number"
              min="0"
              step="0.01"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1 text-sm w-24"
            />
          </label>
        </div>
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
          vehicle={selectedPetrolVehicle}
          type="ice"
          periodMonths={periodMonths}
          fuelPrice={fuelPrice}
          mode={petrolMode}
          selectedCurrency={selectedCurrency}
          formatCurrency={formatCurrency}
        />
      </div>
    </section>
  );
};

export default VehicleComparisonSection;
