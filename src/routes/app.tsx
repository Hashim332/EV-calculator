import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../supabase.ts";
import ExplanatorySection from "../components/ExplanatorySection";
import PeriodSelector from "../components/PeriodSelector";
import VehicleComparisonSection from "../components/VehicleComparisonSection";
import ExternalLinksSection from "../components/ExternalLinksSection";

interface Vehicle {
  uuid: string;
  make: string;
  model: string;
  type: string;
  msrp_gbp: number;
  lease_monthly: number;
  max_range: number;
  battery_size: number;
  efficiency_mpkwh: number;
  efficiency_mpg: number;
  segment: string;
  depreciation_band: string; // Changed to band: "high" or "low"
  maintenance_gbp_per_year: number;
  fuel_type: string;
  image_url?: string;
}

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEV, setSelectedEV] = useState<string | null>(null);
  const [selectedPetrol, setSelectedPetrol] = useState<string | null>(null);
  // Add state for period selection
  const [periodMonths, setPeriodMonths] = useState<number>(36);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("vehicle-data")
          .select("*");

        if (fetchError) {
          throw fetchError;
        }

        setVehicles(data || []);
        console.log("Fetched vehicles:", data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600'></div>
        <p className='mt-4 text-gray-600 text-sm'>Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <div className='text-red-600 text-center max-w-md'>
          <h2 className='text-lg font-semibold mb-2'>Error Loading Vehicles</h2>
          <p className='text-sm'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-gray-50'>
      <Navbar />
      <header className='w-full max-w-md mb-8'>
        <h1 className='text-xl font-bold text-center m-0'>
          EV Car Cost Calculator
        </h1>
      </header>
      {/* Explanatory Section: Purpose and How to Use */}
      <ExplanatorySection />
      <main className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 min-h-[300px] flex flex-col items-center justify-center'>
        {/* Top section: catchy heading and description */}
        <section className='mb-8 w-full text-center'>
          <h2 className='text-lg font-semibold text-violet-500 mb-2'>
            Lease or Buy? Make the Smart Choice!
          </h2>
          <p className='text-sm text-gray-600'>
            This website helps you compare the cost of leasing an electric
            vehicle (EV), which is a popular option right now, versus buying a
            petrol or diesel (ICE) car outright. See how lease payments, running
            costs, and resale values stack up so you can make the most informed
            decision for your needs.
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
        {/* Feature Note Section */}
        <div className='w-full max-w-2xl mx-auto mb-8 text-xs text-gray-400 text-center'></div>
        {/* Transparency Note Section */}
        <div className='w-full max-w-2xl mx-auto mb-8 text-xs text-gray-500 text-center'>
          <span>
            <strong>Note:</strong> Electricity cost is estimated at £0.30 per
            kWh (UK average), and petrol/diesel fuel cost is estimated at £1.45
            per litre. These values may not reflect your actual rates.
          </span>
        </div>
        {/* External Links Section: Car Buying & Leasing Sites */}
        <ExternalLinksSection />
      </main>
    </div>
  );
}

export default App;
