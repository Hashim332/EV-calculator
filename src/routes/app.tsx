import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { supabase } from "../supabase.ts";
import VehicleDropdown from "../components/VehicleDropdown";
import VehicleDetails from "../components/VehicleDetails";

interface Vehicle {
  uuid: string;
  make: string;
  model: string;
  type: string;
  msrp_gbp: number;
  lease_monthly: number;
  max_range: number;
  battery_size: number;
  efficiency: number;
  efficiency_mpg: number;
  segment: string;
  depreciation_3yr_percent: number;
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
        <p className='mt-4 text-gray-600'>Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <div className='text-red-600 text-center max-w-md'>
          <h2 className='text-xl font-semibold mb-2'>Error Loading Vehicles</h2>
          <p className='text-sm'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-gray-50'>
      <Navbar />
      <header className='w-full max-w-md mb-8'>
        <h1 className='text-2xl font-bold text-center m-0'>
          EV Car Cost Calculator
        </h1>
      </header>
      <main className='w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 min-h-[300px] flex flex-col items-center justify-center'>
        {/* Top section: catchy heading and description */}
        <section className='mb-8 w-full text-center'>
          <h2 className='text-xl font-semibold text-violet-500 mb-2'>
            Lease or Buy? Make the Smart Choice!
          </h2>
          <p className='text-gray-600'>
            This website helps you compare the cost of leasing an electric
            vehicle (EV), which is a popular option right now, versus buying a
            petrol or diesel (ICE) car outright. See how lease payments, running
            costs, and resale values stack up so you can make the most informed
            decision for your needs.
          </p>
        </section>
        {/* Comparison Section */}
        <section className='w-full flex flex-col md:flex-row gap-10 mb-8'>
          {/* EV Column */}
          <div className='flex-1 bg-violet-50 rounded-xl p-8 flex flex-col items-center min-h-[340px]'>
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
            />
          </div>
          {/* Petrol Column */}
          <div className='flex-1 bg-orange-50 rounded-xl p-8 flex flex-col items-center min-h-[340px]'>
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
            />
          </div>
        </section>
        {/* Feature Note Section */}
        <div className='w-full max-w-2xl mx-auto mb-8 text-xs text-gray-400 text-center'>
          <span>
            Future features: adjustable lease/ownership term (2-4 years), annual
            mileage, electricity price, and more user inputs.
          </span>
        </div>
        <hr className='w-full border-gray-200 mb-6' />
        <p className='text-gray-500 text-center'>Next section here</p>
        {/* Debug info - can be removed later */}
        <div className='text-xs text-gray-400 text-center mt-4'>
          Vehicles loaded: {vehicles.length}
        </div>
      </main>
    </div>
  );
}

export default App;
