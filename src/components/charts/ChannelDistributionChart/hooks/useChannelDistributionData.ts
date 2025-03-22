import { useMemo } from 'react';
import { Transaction, UtmSource } from '../../../../types/transaction';
import { UtmSourceColors } from '../../../../constants/UtmSourceColors';
import { ChannelDistributionChartData } from '../ChannelDistributionChart.types';

export const useChannelDistributionData = (transactions: Transaction[]): ChannelDistributionChartData[] => {
    return useMemo(() => {
        return Object.values(UtmSource)
            .map(source => {
                const count = transactions.filter(t => t.utm_source === source).length;
                const percentage = transactions.length > 0 ? (count / transactions.length) * 100 : 0;
                
                return {
                    id: source,
                    label: source.charAt(0).toUpperCase() + source.slice(1),
                    value: Math.round(percentage),
                    color: UtmSourceColors[source]
                };
            })
            .filter(item => item.value > 0);
    }, [transactions]);
}; 