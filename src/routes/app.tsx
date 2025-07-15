import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import PeriodSelector from "../components/PeriodSelector";
import VehicleComparisonSection from "../components/VehicleComparisonSection";
import ExternalLinksSection from "../components/ExternalLinksSection";
import { ExplanatoryAccordion } from "../components/ExplanatorySection";
import { useVehicles } from "../hooks/useVehicles";

function App() {
  const { data: vehicles = [], isLoading: loading, error } = useVehicles();
  const [selectedEV, setSelectedEV] = useState<string | null>(null);
  const [selectedPetrol, setSelectedPetrol] = useState<string | null>(null);
  // Add state for period selection
  const [periodMonths, setPeriodMonths] = useState<number>(36);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        <p className="mt-4 text-gray-600 text-sm">Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-red-600 text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error Loading Vehicles</h2>
          <p className="text-sm">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50">
      <Navbar />
      <header className="w-full max-w-md mb-8">
        <h1 className="text-xl font-bold text-center m-0">
          EV Car Cost Calculator
        </h1>
      </header>
      {/* Explanatory Section: Purpose and How to Use */}
      {/* <ExplanatorySection /> */}
      <main className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 min-h-[300px] flex flex-col items-center justify-center">
        {/* Top section: catchy heading and description */}
        <section className="mb-8 w-full text-center">
          <h2 className="text-lg font-semibold text-violet-500 mb-2">
            Lease or Buy? Make the Smart Choice!
          </h2>
          <p className="text-sm text-gray-600">
            This website helps you compare the cost of leasing an electric
            vehicle (EV), which is a popular option right now, versus buying a
            petrol or diesel (ICE) car outright.
          </p>
        </section>
        {/* Period Selection Section */}
        <PeriodSelector
          periodMonths={periodMonths}
          setPeriodMonths={setPeriodMonths}
        />
        {/* Comparison Section */}
        <VehicleComparisonSection
          vehicles={vehicles}
          selectedEV={selectedEV}
          setSelectedEV={setSelectedEV}
          selectedPetrol={selectedPetrol}
          setSelectedPetrol={setSelectedPetrol}
          periodMonths={periodMonths}
        />
        <div className="w-full max-w-2xl mx-auto mb-8 text-xs text-gray-500 text-center">
          <span>
            <strong>Note:</strong> Electricity cost is estimated at £0.30 per
            kWh (UK average), and petrol/diesel fuel cost is estimated at £1.45
            per litre. These values may not reflect your actual rates.
          </span>
        </div>
        {/* Explanatory Accordion Section */}
        <ExplanatoryAccordion />
        {/* Feature Note Section */}
        <div className="w-full max-w-2xl mx-auto mb-8 text-xs text-gray-400 text-center"></div>
        {/* Transparency Note Section */}

        {/* External Links Section: Car Buying & Leasing Sites */}
        <ExternalLinksSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
