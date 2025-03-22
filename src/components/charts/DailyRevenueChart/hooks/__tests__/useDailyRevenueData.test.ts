import { renderHook } from '@testing-library/react';
import { useDailyRevenueData } from '../useDailyRevenueData';
import { Transaction, UtmSource } from '../../../../../types/transaction';

describe('useDailyRevenueData', () => {
    const mockTransactions: Transaction[] = [
        { transaction_id: '1', transaction_time: Date.now(), revenue_usd: 100, customer_id: '1', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '2', transaction_time: Date.now(), revenue_usd: 200, customer_id: '2', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '3', transaction_time: Date.now(), revenue_usd: 150, customer_id: '3', utm_source: UtmSource.Google, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '4', transaction_time: Date.now(), revenue_usd: 250, customer_id: '4', utm_source: UtmSource.Instagram, customer_metadata: { birthday_time: 0, gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '5', transaction_time: Date.now(), revenue_usd: 300, customer_id: '5', utm_source: UtmSource.None, customer_metadata: { birthday_time: 0, gender: 'male', country: 'US', device: 'mobile' } },
    ];

    it('should calculate correct daily revenue data', () => {
        const { result } = renderHook(() => useDailyRevenueData(mockTransactions));

        const data = result.current;
        
        // Should have one series with id 'Daily Revenue'
        expect(data).toHaveLength(1);
        expect(data[0].id).toBe('Daily Revenue');
        
        // Should have data points for each day
        expect(data[0].data.length).toBeGreaterThan(0);
        
        // Each data point should have x (date) and y (revenue)
        data[0].data.forEach((point: { x: string; y: number }) => {
            expect(point).toHaveProperty('x');
            expect(point).toHaveProperty('y');
            expect(typeof point.x).toBe('string');
            expect(typeof point.y).toBe('number');
        });
    });

    it('should handle empty transactions array', () => {
        const { result } = renderHook(() => useDailyRevenueData([]));
        
        const data = result.current;
        
        // Should return empty data array
        expect(data).toHaveLength(1);
        expect(data[0].id).toBe('Daily Revenue');
        expect(data[0].data).toHaveLength(0);
    });

    it('should memoize results and not recalculate unnecessarily', () => {
        const { result, rerender } = renderHook(
            ({ transactions }: { transactions: Transaction[] }) => useDailyRevenueData(transactions),
            { initialProps: { transactions: mockTransactions } }
        );

        const firstResult = result.current;
        
        // Rerender with same transactions
        rerender({ transactions: mockTransactions });
        
        // Should be the same reference due to memoization
        expect(result.current).toBe(firstResult);
    });
}); 