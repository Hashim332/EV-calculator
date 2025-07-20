import { useState, useCallback } from "react";
import type { Currency } from "../components/CurrencyConverter";
import { convertCurrency } from "../components/CurrencyConverter";

export const useCurrency = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("GBP");

  const formatCurrency = useCallback(
    (amount: number, currency: Currency = selectedCurrency): string => {
      const convertedAmount = convertCurrency(amount, "GBP", currency);

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(convertedAmount);
    },
    [selectedCurrency]
  );

  const formatCurrencyWithDecimals = useCallback(
    (amount: number, currency: Currency = selectedCurrency): string => {
      const convertedAmount = convertCurrency(amount, "GBP", currency);

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertedAmount);
    },
    [selectedCurrency]
  );

  const convertAmount = useCallback(
    (amount: number, fromCurrency: Currency = "GBP"): number => {
      return convertCurrency(amount, fromCurrency, selectedCurrency);
    },
    [selectedCurrency]
  );

  return {
    selectedCurrency,
    setSelectedCurrency,
    formatCurrency,
    formatCurrencyWithDecimals,
    convertAmount,
  };
};
