import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export const WhatDoesThisToolDoSection: React.FC = () => (
  <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-violet-100 border border-violet-200 rounded-xl p-4 sm:p-6 md:p-8 text-center relative overflow-hidden'>
    <div className='relative z-10'>
      <h2 className='text-lg font-semibold text-violet-700 mb-2'>
        What does this tool do?
      </h2>
      <p className='text-gray-700 mb-4 text-sm'>
        This tool helps you compare the true cost of different vehicle ownership
        models. <span className='font-medium'>Mix and match</span> between
        buying or leasing{" "}
        <span className='font-medium'>electric vehicles (EVs)</span> and{" "}
        <span className='font-medium'>petrol/diesel (ICE) cars</span>. Compare
        leasing to leasing, buying to buying, or any combination that fits your
        needs. It takes into account lease payments, purchase prices, running
        costs, depreciation, and resale values to show which option is more
        economically viable for you.
      </p>
    </div>
  </section>
);

export const HowToUseSection: React.FC = () => (
  <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-violet-100 border border-violet-200 rounded-xl p-4 sm:p-6 md:p-8 text-center relative overflow-hidden'>
    <div className='relative z-10'>
      <h3 className='text-base font-semibold text-violet-600 mt-4 mb-4'>
        How to use it
      </h3>
      <ol className='flex flex-col md:flex-row items-center md:items-start justify-center gap-4 md:gap-8 mb-2'>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            1
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Choose your ownership model for each vehicle type using the
            Buy/Lease buttons. Mix and match as needed - compare EV leasing to
            ICE buying, or any other combination.
          </span>
        </li>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            2
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Select specific vehicles to compare. For fair comparisons, pick cars{" "}
            that are similar in size, price range, or segment.
          </span>
        </li>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            3
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Review the cost breakdown and total costs for each option. Adjust
            fuel/electricity prices as needed for your area.
          </span>
        </li>
        <li className='flex flex-col items-center w-full sm:w-64 md:w-48 self-auto'>
          <div className='w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-violet-500 text-white font-bold text-base mb-2 shadow-md'>
            4
          </div>
          <span className='text-gray-700 text-center text-sm'>
            Make an informed decision based on which ownership model and vehicle{" "}
            best fits your budget and lifestyle.
          </span>
        </li>
      </ol>
    </div>
  </section>
);

export const ExplanatoryAccordion: React.FC = () => (
  <div className='w-full my-6'>
    <Accordion type='single' collapsible defaultValue='what-does-this-tool-do'>
      <AccordionItem value='what-does-this-tool-do'>
        <AccordionTrigger>What does this tool do?</AccordionTrigger>
        <AccordionContent>
          <WhatDoesThisToolDoSection />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='how-to-use'>
        <AccordionTrigger>How to use</AccordionTrigger>
        <AccordionContent>
          <HowToUseSection />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='comparison-options'>
        <AccordionTrigger>What comparisons can I make?</AccordionTrigger>
        <AccordionContent>
          <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-violet-100 border border-violet-200 rounded-xl p-4 sm:p-6 md:p-8 text-center relative overflow-hidden'>
            <div className='relative z-10 text-gray-700 text-sm'>
              <p className='mb-3'>
                This tool supports flexible comparisons between different
                ownership models:
              </p>
              <ul className='text-left space-y-2 max-w-md mx-auto'>
                <li>
                  <strong>EV Lease vs ICE Purchase:</strong> Compare leasing an
                  electric car to buying a petrol/diesel car
                </li>
                <li>
                  <strong>EV Lease vs ICE Lease:</strong> Compare leasing both
                  types of vehicles
                </li>
                <li>
                  <strong>EV Purchase vs ICE Purchase:</strong> Compare buying
                  both outright (when EV purchase data is available)
                </li>
                <li>
                  <strong>Mixed scenarios:</strong> Any combination that suits
                  your specific needs
                </li>
              </ul>
              <p className='mt-3'>
                <em>
                  Note: Some combinations may not have complete data yet, but
                  the tool will clearly indicate when information is
                  unavailable.
                </em>
              </p>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='why-lease-ev'>
        <AccordionTrigger>Why do people often lease EVs?</AccordionTrigger>
        <AccordionContent>
          <section className='w-full max-w-3xl mx-auto mb-6 md:mb-8 bg-violet-100 border border-violet-200 rounded-xl p-4 sm:p-6 md:p-8 text-center relative overflow-hidden'>
            <div className='relative z-10 text-gray-700 text-sm'>
              <p className='mb-2'>
                While this tool now supports all ownership models, many people
                still prefer leasing EVs for several reasons: EV technology
                evolves rapidly with major improvements in range, charging
                speed, and features every few years. Leasing lets you access the
                latest technology without worrying about long-term depreciation
                or battery degradation. However, if you drive high mileage or
                prefer ownership, buying might make more sense - that's why this
                tool helps you compare all options fairly.
              </p>
            </div>
          </section>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
);
