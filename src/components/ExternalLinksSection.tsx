import React from "react";

const ExternalLinksSection: React.FC = () => (
  <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 text-center'>
    <h3 className='text-base font-semibold text-violet-700 mb-2'>
      Want more real-world info?
    </h3>
    <p className='text-sm text-gray-600 mb-4'>
      Check out these popular UK car buying and leasing sites:
    </p>
    <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'>
      <div className='flex-1 min-w-0'>
        <h4 className='font-semibold text-gray-700 mb-1 text-sm'>Buying</h4>
        <ul className='text-violet-600 text-sm space-y-1'>
          <li>
            <a
              href='https://www.autotrader.co.uk/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Auto Trader
            </a>
          </li>
          <li>
            <a
              href='https://www.carwow.co.uk/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Carwow
            </a>
          </li>
          <li>
            <a
              href='https://www.cazoo.co.uk/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Cazoo
            </a>
          </li>
        </ul>
      </div>
      <div className='flex-1 min-w-0 mt-4 md:mt-0'>
        <h4 className='font-semibold text-gray-700 mb-1 text-sm'>Leasing</h4>
        <ul className='text-violet-600 text-sm space-y-1'>
          <li>
            <a
              href='https://www.leasing.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Leasing.com
            </a>
          </li>
          <li>
            <a
              href='https://www.selectcarleasing.co.uk/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Select Car Leasing
            </a>
          </li>
          <li>
            <a
              href='https://www.carwow.co.uk/car-leasing'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline block py-2 md:py-1 rounded focus:outline-none focus:ring-2 focus:ring-violet-400'
            >
              Carwow Leasing
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default ExternalLinksSection;
