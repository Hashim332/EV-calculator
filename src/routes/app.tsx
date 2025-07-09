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
      <main className='w-full max-w-md bg-white rounded-xl shadow-md p-6 min-h-[200px] flex flex-col items-center justify-center'>
        <p className='text-gray-500 text-center'>
          Welcome! This tool will help you estimate the cost of owning an
          electric vehicle.
          <br />
          <span className='text-xs text-gray-400'>
            (Calculator coming soon)
          </span>
        </p>
      </main>
    </div>
  );
}

export default App;
