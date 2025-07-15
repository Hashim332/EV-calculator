import React from "react";

interface PeriodSelectorProps {
  periodMonths: number;
  setPeriodMonths: (months: number) => void;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  periodMonths,
  setPeriodMonths,
}) => (
  <section className='mb-6 md:mb-8 w-full max-w-3xl mx-auto flex flex-col items-center'>
    <label className='font-medium text-base mb-2'>
      Select ownership/lease period:
    </label>
    <div className='flex flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none justify-center'>
      {[24, 36, 48].map((months) => (
        <button
          key={months}
          type='button'
          onClick={() => setPeriodMonths(months)}
          className={`w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3 rounded-lg border text-sm font-semibold transition-colors
            ${
              periodMonths === months
                ? "bg-violet-600 text-white border-violet-600 shadow"
                : "bg-white text-violet-700 border-violet-200 hover:bg-violet-50"
            }
          `}
          aria-pressed={periodMonths === months}
        >
          {months} months ({months / 12} year{months !== 12 ? "s" : ""})
        </button>
      ))}
    </div>
  </section>
);

export default PeriodSelector;
