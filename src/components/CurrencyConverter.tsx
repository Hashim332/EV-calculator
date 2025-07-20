import React, { useState, useEffect } from "react";

export type Currency = "GBP" | "EUR" | "USD";

interface CurrencyConverterProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

// Exchange rates (you could fetch these from an API in a real app)
const EXCHANGE_RATES: Record<Currency, Record<Currency, number>> = {
  GBP: {
    GBP: 1,
    EUR: 1.17,
    USD: 1.27,
  },
  EUR: {
    GBP: 0.85,
    EUR: 1,
    USD: 1.08,
  },
  USD: {
    GBP: 0.79,
    EUR: 0.92,
    USD: 1,
  },
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: "£",
  EUR: "€",
  USD: "$",
};

const CURRENCY_NAMES: Record<Currency, string> = {
  GBP: "British Pound",
  EUR: "Euro",
  USD: "US Dollar",
};

export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  if (fromCurrency === toCurrency) return amount;
  return amount * EXCHANGE_RATES[fromCurrency][toCurrency];
};

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  selectedCurrency,
  onCurrencyChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">
          {CURRENCY_SYMBOLS[selectedCurrency]}
        </span>
        <span className="text-sm text-gray-600">{selectedCurrency}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <ul className="py-1">
            {Object.entries(CURRENCY_NAMES).map(([code, name]) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => handleCurrencySelect(code as Currency)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors ${
                    selectedCurrency === code
                      ? "bg-violet-50 text-violet-700"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">
                      {CURRENCY_SYMBOLS[code as Currency]}
                    </span>
                    <span className="text-sm font-medium">{code}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {name}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
