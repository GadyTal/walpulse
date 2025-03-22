import React, { createContext, useContext, useState, useMemo } from 'react';
import { TimeFilter, AdvancedFilters, DEFAULT_ADVANCED_FILTERS } from '../../types/filters';
import { AvailableFilterOptions, FiltersContextType } from './FiltersContext.types';
import { useTransactions } from '../TransactionContext/TransactionContext';
import { calculateStatsFn, filterTransactionsFn } from './FiltersContext.helpers';
import { MILLISECONDS_PER_YEAR } from "../../constants/time";

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);


export const FiltersContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { transactions } = useTransactions();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(TimeFilter.LAST_7_DAYS);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(DEFAULT_ADVANCED_FILTERS);

  // Compute filtered transactions based on the current time filter and advanced filters
  // This memoization prevents unnecessary filtering on every render
  const filteredTransactions = useMemo(() =>
    filterTransactionsFn(transactions, timeFilter, advancedFilters),
    [transactions, timeFilter, advancedFilters]
  );

  // Compute transaction statistics based on filtered data
  // Memoization ensures stats are only recalculated when the underlying data changes
  const stats = useMemo(() =>
    calculateStatsFn(transactions, filteredTransactions, timeFilter === TimeFilter.ALL_TIME, timeFilter),
    [transactions, filteredTransactions, timeFilter]
  );

  // Prepare the context value object with all necessary transaction-related data and controls
  const availableFilterOptions = useMemo(() => {
    // Get unique values from the raw API data
    const currentUtmSources = new Set(transactions.map(t => t.utm_source));
    const currentGenders = new Set(transactions.map(t => t.customer_metadata.gender));
    const currentCountries = new Set(transactions.map(t => t.customer_metadata.country));
    
    // Get all possible age groups from the raw API data
    const currentAgeGroups = new Set(
      transactions.map(t => {
        const age = Math.floor((Date.now() - t.customer_metadata.birthday_time) / MILLISECONDS_PER_YEAR);
        if (age < 15) return "Under 15";
        if (age < 20) return "15-19";
        if (age < 30) return "20-29";
        if (age < 40) return "30-39";
        if (age < 50) return "40-49";
        return "50+";
      })
    );

    const options: AvailableFilterOptions = {
      utmSources: Array.from(currentUtmSources),
      ageGroups: Array.from(currentAgeGroups),
      genders: Array.from(currentGenders),
      countries: Array.from(currentCountries),
      revenueRanges: [
        { min: 0, max: 100, label: '0-100' },
        { min: 100, max: 500, label: '100-500' },
        { min: 500, max: 1000, label: '500-1000' },
        { min: 1000, max: Infinity, label: '1000+' }
      ]
    };
    return options;
  }, [transactions]); // Only depend on the raw API data

  const value: FiltersContextType = {
    timeFilter,
    setTimeFilter,
    advancedFilters,
    setAdvancedFilters,
    availableFilterOptions,
    filteredStats: stats,
    filteredTransactions
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};

// Custom hook for accessing transaction context
// Provides type-safe access to transaction data and controls
// Throws an error if used outside of TransactionProvider
export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a TransactionProvider');
  }
  return context;
}; 