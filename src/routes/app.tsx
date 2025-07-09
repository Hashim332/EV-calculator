import Navbar from "../components/Navbar";

function App() {
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
            <label
              htmlFor='ev-select'
              className='mb-3 font-medium text-violet-700 text-lg'
            >
              Select EV
            </label>
            <select
              id='ev-select'
              className='mb-6 p-3 rounded border border-violet-200 w-full text-base'
            >
              <option>Tesla Model 3</option>
            </select>
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
            <label
              htmlFor='petrol-select'
              className='mb-3 font-medium text-orange-700 text-lg'
            >
              Select Petrol Car
            </label>
            <select
              id='petrol-select'
              className='mb-6 p-3 rounded border border-orange-200 w-full text-base'
            >
              <option>Mercedes C-Class</option>
            </select>
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
      </main>
    </div>
  );
}

export default App;
