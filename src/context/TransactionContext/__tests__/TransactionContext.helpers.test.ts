import { filterTransactionsFn, calculateStatsFn } from '../../FiltersContext/FiltersContext.helpers';
import { TimeFilter } from '../../../types/filters';
import { Transaction, UtmSource } from '../../../types/transaction';

describe('filterTransactionsFn', () => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const mockTransactions: Transaction[] = [
    // Last 7 days
    { transaction_id: '1', transaction_time: now - (2 * day), revenue_usd: 100, customer_id: '1', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '2', transaction_time: now - (5 * day), revenue_usd: 200, customer_id: '2', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
    
    // Previous 7 days (8-14 days ago)
    { transaction_id: '3', transaction_time: now - (10 * day), revenue_usd: 150, customer_id: '3', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '4', transaction_time: now - (12 * day), revenue_usd: 250, customer_id: '4', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
    
    // 15-30 days ago
    { transaction_id: '5', transaction_time: now - (20 * day), revenue_usd: 300, customer_id: '5', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '6', transaction_time: now - (25 * day), revenue_usd: 180, customer_id: '6', utm_source: UtmSource.TikTok, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
    
    // 31-60 days ago
    { transaction_id: '7', transaction_time: now - (35 * day), revenue_usd: 120, customer_id: '7', utm_source: UtmSource.Instagram, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '8', transaction_time: now - (45 * day), revenue_usd: 90, customer_id: '8', utm_source: UtmSource.Pinterest, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
  ];

  it('should filter transactions for last 7 days', () => {
    const filtered = filterTransactionsFn(mockTransactions, TimeFilter.LAST_7_DAYS, {
      utmSources: [], ageGroups: [], gender: [], revenueRange: { min: 0, max: Infinity },
      countries: []
    });
    expect(filtered).toHaveLength(2);
    expect(filtered.map(t => t.transaction_id)).toEqual(['1', '2']);
  });

  it('should filter transactions for last 30 days', () => {
    const filtered = filterTransactionsFn(mockTransactions, TimeFilter.LAST_30_DAYS, {
      utmSources: [], ageGroups: [], gender: [], revenueRange: { min: 0, max: Infinity },
      countries: []
    });
    expect(filtered).toHaveLength(6);
    expect(filtered.map(t => t.transaction_id)).toEqual(['1', '2', '3', '4', '5', '6']);
  });

  it('should return all transactions for all time filter', () => {
    const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
      utmSources: [], ageGroups: [], gender: [], revenueRange: { min: 0, max: Infinity },
      countries: []
    });
    expect(filtered).toHaveLength(8);
    expect(filtered).toEqual(mockTransactions);
  });
});

describe('calculateStatsFn', () => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  const mockTransactions: Transaction[] = [
    // Current period (last 7 days)
    { transaction_id: '1', transaction_time: now - (2 * day), revenue_usd: 100, customer_id: '1', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '2', transaction_time: now - (5 * day), revenue_usd: 200, customer_id: '2', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
    
    // Previous period (8-14 days ago)
    { transaction_id: '3', transaction_time: now - (10 * day), revenue_usd: 150, customer_id: '3', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '4', transaction_time: now - (12 * day), revenue_usd: 250, customer_id: '3', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
    
    // 15-30 days ago
    { transaction_id: '5', transaction_time: now - (20 * day), revenue_usd: 300, customer_id: '5', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    { transaction_id: '6', transaction_time: now - (25 * day), revenue_usd: 180, customer_id: '6', utm_source: UtmSource.TikTok, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
  ];

  it('should calculate stats correctly for last 7 days', () => {
    const currentPeriodTxs = mockTransactions.filter(t => t.transaction_time >= now - (7 * day));
    const stats = calculateStatsFn(mockTransactions, currentPeriodTxs, false, TimeFilter.LAST_7_DAYS);

    // Current period: $300 (100 + 200)
    // Previous period: $400 (150 + 250)
    expect(stats.totalRevenue).toBe(300);
    expect(stats.revenueChange).toBeCloseTo(-25); // (300 - 400) / 400 * 100

    // Current period: 2 transactions
    // Previous period: 2 transactions
    expect(stats.totalTransactions).toBe(2);
    expect(stats.transactionsChange).toBe(0);

    // Current period: 2 unique customers
    // Previous period: 1 unique customer (customer_id: '3' appears twice)
    expect(stats.uniqueCustomers).toBe(2);
    expect(stats.customersChange).toBe(100);
  });

  it('should calculate stats correctly for last 30 days', () => {
    const currentPeriodTxs = mockTransactions.filter(t => t.transaction_time >= now - (30 * day));
    const stats = calculateStatsFn(mockTransactions, currentPeriodTxs, false, TimeFilter.LAST_30_DAYS);

    // Current period: $1180 (100 + 200 + 150 + 250 + 300 + 180)
    // Previous period: $0 (no transactions in 31-60 days ago)
    expect(stats.totalRevenue).toBe(1180);
    expect(stats.revenueChange).toBe(100); // No previous transactions = 100% increase

    // Current period: 6 transactions
    // Previous period: 0 transactions
    expect(stats.totalTransactions).toBe(6);
    expect(stats.transactionsChange).toBe(100);

    // Current period: 5 unique customers
    // Previous period: 0 unique customers
    expect(stats.uniqueCustomers).toBe(5);
    expect(stats.customersChange).toBe(100);
  });

  it('should return zero changes for all time filter', () => {
    const stats = calculateStatsFn(mockTransactions, mockTransactions, true, TimeFilter.ALL_TIME);

    expect(stats.totalRevenue).toBe(1180);
    expect(stats.revenueChange).toBe(0);
    expect(stats.totalTransactions).toBe(6);
    expect(stats.transactionsChange).toBe(0);
    expect(stats.uniqueCustomers).toBe(5);
    expect(stats.customersChange).toBe(0);
  });

  it('should handle empty current period', () => {
    const stats = calculateStatsFn(mockTransactions, [], false, TimeFilter.LAST_7_DAYS);

    expect(stats.totalRevenue).toBe(0);
    expect(stats.totalTransactions).toBe(0);
    expect(stats.uniqueCustomers).toBe(0);
    // Previous period has transactions, so we should see -100% changes
    expect(stats.revenueChange).toBe(-100);
    expect(stats.transactionsChange).toBe(-100);
    expect(stats.customersChange).toBe(-100);
  });

  it('should handle empty previous period', () => {
    const currentPeriodTxs = mockTransactions.slice(0, 2); // Only last 7 days
    const emptyPreviousPeriodTxs = mockTransactions.filter(t => t.transaction_time < now - (60 * day)); // No transactions
    const stats = calculateStatsFn([...currentPeriodTxs, ...emptyPreviousPeriodTxs], currentPeriodTxs, false, TimeFilter.LAST_7_DAYS);

    expect(stats.totalRevenue).toBe(300);
    expect(stats.totalTransactions).toBe(2);
    expect(stats.uniqueCustomers).toBe(2);
    // No previous transactions = 100% increase
    expect(stats.revenueChange).toBe(100);
    expect(stats.transactionsChange).toBe(100);
    expect(stats.customersChange).toBe(100);
  });
}); 