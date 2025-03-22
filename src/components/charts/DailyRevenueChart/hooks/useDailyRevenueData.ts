import { useMemo } from "react";
import { Transaction } from "../../../../types/transaction";
import { DailyRevenueChartData } from "../DailyRevenueChart.types";

export const useDailyRevenueData = (transactions: Transaction[]): DailyRevenueChartData[] => {
    return useMemo(() => {
        if (!transactions.length) {
            return [{ id: 'Daily Revenue', data: [] }];
        }

        // Sort transactions chronologically to determine date range
        const sortedTransactions = [...transactions].sort((a, b) => 
            a.transaction_time - b.transaction_time
        );

        // Extract date range from first and last transaction
        const startDate = new Date(sortedTransactions[0].transaction_time);
        const endDate = new Date(sortedTransactions[sortedTransactions.length - 1].transaction_time);

        // Generate array of all dates between start and end date
        // This ensures we have data points for all days, even those without transactions
        const dates: Date[] = [];
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Aggregate revenue by date
        // Creates a map of date strings to total revenue for that day
        const dailyRevenue = dates.reduce((acc, date) => {
            const dateStr = date.toISOString().split('T')[0];
            const dayRevenue = transactions
                .filter(t => new Date(t.transaction_time).toISOString().split('T')[0] === dateStr)
                .reduce((sum, t) => sum + t.revenue_usd, 0);
            
            acc[dateStr] = dayRevenue;
            return acc;
        }, {} as Record<string, number>);

        // Transform data into format required by Nivo chart library
        // Each data point has x (date) and y (revenue) coordinates
        const data = Object.entries(dailyRevenue).map(([date, revenue]) => ({
            x: date,
            y: revenue
        }));

        return [{
            id: 'Daily Revenue',
            data: data
        }];
    }, [transactions]);
}; 