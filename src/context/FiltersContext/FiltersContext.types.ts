import { Transaction } from '../../types/transaction';
import { TimeFilter, AdvancedFilters } from '../../types/filters';

export const enum StatsTrend {
    Up = 'up',
    Down = 'down',
    Neutral = 'neutral',
  }
  
  export interface StatsIndicatorProps {
    value: number;
    change: StatsIndicator;
  };
  
  export interface StatsIndicator {
    value: number;
    percentage: number;
    trend: StatsTrend;
  }
  
  export interface Stats {
    totalRevenue: number;
    totalTransactions: number;
    uniqueCustomers: number;
    revenueChange: number;
    transactionsChange: number;
    customersChange: number;
  }
  
  export interface AvailableFilterOptions {
    utmSources: string[];
    ageGroups: string[];
    genders: string[];
    revenueRanges: {
      min: number;
      max: number;
      label: string;
    }[];
    countries: string[];
  }
  
  export interface FiltersContextType {
    timeFilter: TimeFilter;
    setTimeFilter: (filter: TimeFilter) => void;
    advancedFilters: AdvancedFilters;
    setAdvancedFilters: (filters: AdvancedFilters) => void;
    availableFilterOptions: AvailableFilterOptions;
    filteredStats: Stats;
    filteredTransactions: Transaction[];
  }