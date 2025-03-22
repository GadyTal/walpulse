import { StatCard } from '../StatCard/StatCard';
import { formatNumber } from '../../utils/numberFormatters';
import { useFilters } from '../../context/FiltersContext/FilterContext';
import { StatsRowContainer } from './StatsRow.styled';
import { getTrend } from './StatsRow.helpers';
import { useTransactions } from '../../context/TransactionContext/TransactionContext';

export const StatsRow = () => {
  const { filteredStats } = useFilters();
  const { loading } = useTransactions();

  return (
    <StatsRowContainer>
      <StatCard
        title="Total Revenue"
        value={filteredStats.totalRevenue}
        change={filteredStats.revenueChange}
        trend={getTrend(filteredStats.revenueChange)}
        prefix="$"
        formatter={(value) => formatNumber(value, { prefix: '$', decimals: 0 })}
        isLoading={loading}
      />
      <StatCard
        title="Total Transactions"
        value={filteredStats.totalTransactions}
        change={filteredStats.transactionsChange}
        trend={getTrend(filteredStats.transactionsChange)}
        formatter={(value) => formatNumber(value, { decimals: 0 })}
        isLoading={loading}
      />
      <StatCard
        title="Unique Customers"
        value={filteredStats.uniqueCustomers}
        change={filteredStats.customersChange}
        trend={getTrend(filteredStats.customersChange)}
        formatter={(value) => formatNumber(value, { decimals: 0 })}
        isLoading={loading}
      />
    </StatsRowContainer>
  );
}; 