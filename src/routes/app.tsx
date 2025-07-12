import Navbar from "../components/Navbar";
import { Analytics } from "@vercel/analytics/next"
import { useState, useEffect } from 'react'
import { supabase } from '../supabase.js'
import VehicleDropdown from '../components/VehicleDropdown'

interface Vehicle {
  uuid: string
  make: string
  model: string
  segment: string
  // Add other vehicle properties as needed
}

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEV, setSelectedEV] = useState<string | null>(null)
  const [selectedPetrol, setSelectedPetrol] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const { data, error: fetchError } = await supabase
          .from('vehicle-data')
          .select('*')
        
        if (fetchError) {
          throw fetchError
        }
        
        setVehicles(data || [])
        console.log('Fetched vehicles:', data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
        console.error('Error fetching vehicles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
        <p className="mt-4 text-gray-600">Loading vehicles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
        <div className="text-red-600 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Error Loading Vehicles</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
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
            Use our tool to compare the true cost of leasing an EV versus buying
            a petrol or diesel car. Factor in fuel, maintenance, and more to see
            which option saves you money and fits your lifestyle best.
          </p>
        </section>
        {/* Comparison Section */}
        <section className='w-full flex flex-col md:flex-row gap-10 mb-8'>
          {/* EV Column */}
          <div className='flex-1 bg-violet-50 rounded-xl p-8 flex flex-col items-center min-h-[340px]'>
            <VehicleDropdown
              vehicles={vehicles}
              selectedId={selectedEV}
              onSelect={setSelectedEV}
              label="Select EV"
              className="text-violet-700"
            />
            <div className='w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center'>
              <img
                src='https://via.placeholder.com/240x120?text=EV'
                alt='EV Car'
                className='object-contain h-full'
              />
            </div>
            <div className='text-center mb-3'>
              <div className='font-semibold text-lg'>Tesla Model 3</div>
              <div className='text-sm text-gray-500'>
                Range: 220 miles | 0-60mph: 5.6s
              </div>
            </div>
            <ul className='text-base text-gray-700 space-y-1 mb-4'>
              <li>Lease: £310/mo</li>
              <li>Electricity: £40/mo</li>
              <li>Maintenance: £25/mo</li>
            </ul>
            <div className='w-full bg-violet-100 rounded p-3 text-center mt-auto'>
              <div className='font-semibold'>3-Year Total Cost</div>
              <div className='text-xl font-bold text-violet-700'>£14,220</div>
              <div className='text-xs text-gray-500'>
                (Lease + Electricity + Maintenance)
              </div>
            </div>
          </div>
          {/* Petrol Column */}
          <div className='flex-1 bg-orange-50 rounded-xl p-8 flex flex-col items-center min-h-[340px]'>
            <VehicleDropdown
              vehicles={vehicles}
              selectedId={selectedPetrol}
              onSelect={setSelectedPetrol}
              label="Select Petrol Car"
              className="text-orange-700"
            />
            <div className='w-64 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center'>
              <img
                src='https://via.placeholder.com/240x120?text=Mercedes+C-Class'
                alt='Mercedes C-Class'
                className='object-contain h-full'
              />
            </div>
            <div className='text-center mb-3'>
              <div className='font-semibold text-lg'>Mercedes C-Class</div>
              <div className='text-sm text-gray-500'>
                MPG: 30 | 0-60mph: 6.0s
              </div>
            </div>
            <ul className='text-base text-gray-700 space-y-1 mb-4'>
              <li>Purchase Price: £38,000</li>
              <li>Resale (3yr): £22,000</li>
              <li>Fuel: £140/mo</li>
              <li>Maintenance: £60/mo</li>
            </ul>
            <div className='w-full bg-orange-100 rounded p-3 text-center mt-auto'>
              <div className='font-semibold'>3-Year Total Cost</div>
              <div className='text-xl font-bold text-orange-700'>£19,320</div>
              <div className='text-xs text-gray-500'>
                (Depreciation + Fuel + Maintenance)
              </div>
            </div>
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
