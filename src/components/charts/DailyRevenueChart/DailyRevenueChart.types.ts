export interface DailyRevenueData {
    x: string;  // Date in ISO format
    y: number;  // Revenue for that day
}

export interface DailyRevenueChartData {
    id: string;
    data: DailyRevenueData[];
} 