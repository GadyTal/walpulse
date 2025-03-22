import { renderHook } from '@testing-library/react';
import { Transaction, UtmSource } from '../../../../../types/transaction';
import { ChannelDistributionChartData } from '../../ChannelDistributionChart.types';
import { useChannelDistributionData } from '../useChannelDistributionData';

describe('useChannelDistributionData', () => {
    const mockTransactions: Transaction[] = [
        { transaction_id: '1', transaction_time: Date.now(), revenue_usd: 100, customer_id: '1', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '2', transaction_time: Date.now(), revenue_usd: 200, customer_id: '2', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '3', transaction_time: Date.now(), revenue_usd: 150, customer_id: '3', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '4', transaction_time: Date.now(), revenue_usd: 250, customer_id: '4', utm_source: UtmSource.Instagram, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '5', transaction_time: Date.now(), revenue_usd: 300, customer_id: '5', utm_source: UtmSource.None, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    ];

    it('should calculate correct distribution percentages', () => {
        const { result } = renderHook(() => useChannelDistributionData(mockTransactions));

        const data = result.current;
        
        // Facebook: 2/5 = 40%
        expect(data.find((d: ChannelDistributionChartData) => d.id === UtmSource.Facebook)?.value).toBe(40);
        
        // Google: 1/5 = 20%
        expect(data.find((d: ChannelDistributionChartData) => d.id === UtmSource.Google)?.value).toBe(20);
        
        // Instagram: 1/5 = 20%
        expect(data.find((d: ChannelDistributionChartData) => d.id === UtmSource.Instagram)?.value).toBe(20);
        
        // None: 1/5 = 20%
        expect(data.find((d: ChannelDistributionChartData) => d.id === UtmSource.None)?.value).toBe(20);
        
        // Other: 0/5 = 0% (should not be included in result)
        expect(data.find((d: ChannelDistributionChartData) => d.id === UtmSource.Other)).toBeUndefined();
        
        // Should only include sources with non-zero values
        expect(data).toHaveLength(4);
    });

    it('should handle empty transactions array', () => {
        const { result } = renderHook(() => useChannelDistributionData([]));
        
        const data = result.current;
        
        // Should return empty array when there are no transactions
        expect(data).toHaveLength(0);
    });

    it('should memoize results and not recalculate unnecessarily', () => {
        const { result, rerender } = renderHook(
            ({ transactions }: { transactions: Transaction[] }) => useChannelDistributionData(transactions),
            { initialProps: { transactions: mockTransactions } }
        );

        const firstResult = result.current;
        
        // Rerender with same transactions
        rerender({ transactions: mockTransactions });
        
        // Should be the same reference due to memoization
        expect(result.current).toBe(firstResult);
    });
}); 