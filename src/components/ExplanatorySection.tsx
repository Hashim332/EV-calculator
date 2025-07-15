import React from "react";

const ExplanatorySection: React.FC = () => (
  <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-violet-100 border border-violet-200 rounded-xl p-4 sm:p-6 md:p-8 text-center relative overflow-hidden'>
    <div className='relative z-10'>
      <h2 className='text-lg font-semibold text-violet-700 mb-2'>
        What does this tool do?
      </h2>
      <p className='text-gray-700 mb-4 text-sm'>
        This tool helps you compare the true cost of{" "}
        <span className='font-medium'>leasing an electric vehicle (EV)</span>{" "}
        for a few years versus{" "}
        <span className='font-medium'>
          buying a petrol or diesel (ICE) car outright
        </span>{" "}
        and then selling it. It takes into account lease payments, running
        costs, and resale values to show which option is more economically
        viable for you.
      </p>
      <h3 className='text-base font-semibold text-violet-600 mt-4 mb-4'>
        How to use it
      </h3>
      <ol className='flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-8 mb-2'>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            1
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Select an EV and a petrol/diesel car to compare. For a fair
            comparison, pick cars that are similar in size, price, or segment.
          </span>
        </li>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            2
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Review the details and costs for each option, including total cost
            over the period, running costs, and expected resale value or
            end-of-lease terms.
          </span>
        </li>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            3
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Decide which ownership model and vehicle best fits your needs and
            budget.
          </span>
        </li>
      </ol>
    </div>
  </section>
);

export default ExplanatorySection;
