import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import PeriodSelector from "../components/PeriodSelector";
import VehicleComparisonSection from "../components/VehicleComparisonSection";
import ExternalLinksSection from "../components/ExternalLinksSection";
import { ExplanatoryAccordion } from "../components/ExplanatorySection";
import CurrencyConverter from "../components/CurrencyConverter";
import { useVehicles } from "../hooks/useVehicles";
import { useCurrency } from "../hooks/useCurrency";

function App() {
  const { data: vehicles = [], isLoading: loading, error } = useVehicles();
  const [selectedEV, setSelectedEV] = useState<string | null>(null);
  const [selectedPetrol, setSelectedPetrol] = useState<string | null>(null);
  // Add state for period selection
  const [periodMonths, setPeriodMonths] = useState<number>(36);
  // Add currency state
  const { selectedCurrency, setSelectedCurrency, formatCurrency } =
    useCurrency();

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
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-bold text-center m-0">
            EV Car Cost Calculator
          </h1>
          <div className="flex flex-col items-center gap-2">
            <CurrencyConverter
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
            <div className="text-xs text-red-600 text-center max-w-xs">
              <strong>Disclaimer:</strong> Prices and exchange rates are
              estimates and may not reflect current market conditions.
            </div>
          </div>
        </div>
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
            Instantly compare the cost of buying or leasing EVs and
            petrol/diesel cars in any combination. Pick your vehicles, choose
            your terms, and see a clear cost breakdown to help you decide.
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
          selectedCurrency={selectedCurrency}
          formatCurrency={formatCurrency}
        />
        <div className="w-full max-w-2xl mx-auto mb-8 text-xs text-gray-500 text-center">
          <span>
            <strong>Note:</strong> Costs are calculated on a 10,000 mile per
            year basis.
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
