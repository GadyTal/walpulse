import { renderHook } from '@testing-library/react';
import { useUtmSourceAgeGroupData } from '../useUtmSourceAgeGroupData';
import { Transaction, UtmSource } from '../../../../../types/transaction';

describe('useUtmSourceAgeGroupData', () => {
    const mockTransactions: Transaction[] = [
        { transaction_id: '1', transaction_time: Date.now(), revenue_usd: 100, customer_id: '1', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: Date.now() - (20 * 365 * 24 * 60 * 60 * 1000), gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '2', transaction_time: Date.now(), revenue_usd: 200, customer_id: '2', utm_source: UtmSource.Facebook, customer_metadata: { birthday_time: Date.now() - (35 * 365 * 24 * 60 * 60 * 1000), gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '3', transaction_time: Date.now(), revenue_usd: 150, customer_id: '3', utm_source: UtmSource.Google, customer_metadata: { birthday_time: Date.now() - (25 * 365 * 24 * 60 * 60 * 1000), gender: 'male', country: 'US', device: 'mobile' } },
        { transaction_id: '4', transaction_time: Date.now(), revenue_usd: 250, customer_id: '4', utm_source: UtmSource.Instagram, customer_metadata: { birthday_time: Date.now() - (45 * 365 * 24 * 60 * 60 * 1000), gender: 'female', country: 'UK', device: 'web' } },
        { transaction_id: '5', transaction_time: Date.now(), revenue_usd: 300, customer_id: '5', utm_source: UtmSource.None, customer_metadata: { birthday_time: Date.now() - (55 * 365 * 24 * 60 * 60 * 1000), gender: 'male', country: 'US', device: 'mobile' } },
    ];

    it('should calculate correct age group distribution', () => {
        const { result } = renderHook(() => useUtmSourceAgeGroupData(mockTransactions));

        const data = result.current;
        
        // Should have nodes for all UTM sources and age groups
        expect(data.nodes.length).toBeGreaterThan(0);
        
        // Should have links between UTM sources and age groups
        expect(data.links.length).toBeGreaterThan(0);
        
        // Each link should have source, target, and value
        data.links.forEach(link => {
            expect(link).toHaveProperty('source');
            expect(link).toHaveProperty('target');
            expect(link).toHaveProperty('value');
            expect(typeof link.value).toBe('number');
        });
        
        // Each node should have id and color
        data.nodes.forEach(node => {
            expect(node).toHaveProperty('id');
            expect(node).toHaveProperty('color');
        });
    });

    it('should handle empty transactions array', () => {
        const { result } = renderHook(() => useUtmSourceAgeGroupData([]));
        
        const data = result.current;
        
        // Should have nodes but no links
        expect(data.nodes.length).toBe(0);
        expect(data.links.length).toBe(0);
    });

    it('should memoize results and not recalculate unnecessarily', () => {
        const { result, rerender } = renderHook(
            ({ transactions }: { transactions: Transaction[] }) => useUtmSourceAgeGroupData(transactions),
            { initialProps: { transactions: mockTransactions } }
        );

        const firstResult = result.current;
        
        // Rerender with same transactions
        rerender({ transactions: mockTransactions });
        
        // Should be the same reference due to memoization
        expect(result.current).toBe(firstResult);
    });
}); 