import { TimeFilter, AdvancedFilters } from "../../types/filters";
import { Transaction, AgeGroup } from "../../types/transaction";
import { Stats } from "./FiltersContext.types";
import { MILLISECONDS_PER_YEAR, SEVEN_DAYS, FOURTEEN_DAYS, THIRTY_DAYS, SIXTY_DAYS } from "../../constants/time";

export const calculateAgeGroup = (birthdayTime: number): AgeGroup => {
  const now = new Date().getTime();
  const age = Math.floor((now - birthdayTime) / MILLISECONDS_PER_YEAR);

  if (age < 15) return "Under 15";
  if (age < 20) return "15-19";
  if (age < 30) return "20-29";
  if (age < 40) return "30-39";
  if (age < 50) return "40-49";
  return "50+";
};

export const calculateStatsFn = (
  allTransactions: Transaction[],
  filteredTransactions: Transaction[],
  isAllTime: boolean,
  timeFilter: TimeFilter
): Stats => {
  // Calculate percentage change between current and previous period
  // Returns 100% if previous is 0 and current is positive, 0% if previous is 0 and current is 0
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Get transactions from the previous period for comparison
  // For last 7 days, compares with 7-14 days ago
  // For last 30 days, compares with 30-60 days ago
  const getPreviousPeriodTransactions = (transactions: Transaction[], filter: TimeFilter) => {
    const now = new Date().getTime();
    if (filter === TimeFilter.LAST_7_DAYS) {
      const fourteenDaysAgo = now - FOURTEEN_DAYS;
      const sevenDaysAgo = now - SEVEN_DAYS;
      return transactions.filter(t => 
        t.transaction_time >= fourteenDaysAgo && t.transaction_time < sevenDaysAgo
      );
    } else if (filter === TimeFilter.LAST_30_DAYS) {
      const sixtyDaysAgo = now - SIXTY_DAYS;
      const thirtyDaysAgo = now - THIRTY_DAYS;
      return transactions.filter(t => 
        t.transaction_time >= sixtyDaysAgo && t.transaction_time < thirtyDaysAgo
      );
    }
    return [];
  };

  const currentRevenue = filteredTransactions.reduce((sum, t) => sum + t.revenue_usd, 0);
  const currentTransactions = filteredTransactions.length;
  const currentCustomers = new Set(filteredTransactions.map(t => t.customer_id)).size;

  let revenueChange = 0;
  let transactionsChange = 0;
  let customersChange = 0;

  if (!isAllTime) {
    const previousTransactions = getPreviousPeriodTransactions(allTransactions, timeFilter);
    const previousRevenue = previousTransactions.reduce((sum, t) => sum + t.revenue_usd, 0);
    const previousCount = previousTransactions.length;
    const previousCustomers = new Set(previousTransactions.map(t => t.customer_id)).size;

    revenueChange = calculateChange(currentRevenue, previousRevenue);
    transactionsChange = calculateChange(currentTransactions, previousCount);
    customersChange = calculateChange(currentCustomers, previousCustomers);
  }

  return {
    totalRevenue: currentRevenue,
    totalTransactions: currentTransactions,
    uniqueCustomers: currentCustomers,
    revenueChange,
    transactionsChange,
    customersChange
  };
};

export const filterTransactionsFn = (
  transactions: Transaction[],
  timeFilter: TimeFilter,
  advancedFilters: AdvancedFilters
): Transaction[] => {
  const now = new Date().getTime();
  let filteredTransactions = [...transactions];

  // Apply time filter
  if (timeFilter === TimeFilter.LAST_7_DAYS) {
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    filteredTransactions = filteredTransactions.filter(t => t.transaction_time >= sevenDaysAgo);
  } else if (timeFilter === TimeFilter.LAST_30_DAYS) {
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    filteredTransactions = filteredTransactions.filter(t => t.transaction_time >= thirtyDaysAgo);
  }

  // Apply advanced filters
  if (advancedFilters.utmSources.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      advancedFilters.utmSources.includes(t.utm_source)
    );
  }

  if (advancedFilters.ageGroups.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      advancedFilters.ageGroups.includes(calculateAgeGroup(t.customer_metadata.birthday_time))
    );
  }

  if (advancedFilters.gender.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      advancedFilters.gender.includes(t.customer_metadata.gender)
    );
  }

  if (advancedFilters.countries.length > 0) {
    filteredTransactions = filteredTransactions.filter(t => 
      advancedFilters.countries.includes(t.customer_metadata.country)
    );
  }

  if (advancedFilters.revenueRange.min > 0 || advancedFilters.revenueRange.max < Infinity) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.revenue_usd >= advancedFilters.revenueRange.min && 
      t.revenue_usd <= advancedFilters.revenueRange.max
    );
  }

  return filteredTransactions;
}
