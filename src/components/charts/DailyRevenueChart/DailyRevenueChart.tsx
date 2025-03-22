import { ResponsiveLine } from '@nivo/line';
import { Transaction } from '../../../types/transaction';
import { formatNumber } from '../../../utils/numberFormatters';
import { theme } from '../../../styles/StyledComponents';
import { useDailyRevenueData } from './hooks/useDailyRevenueData';

interface DailyRevenueChartProps {
    transactions: Transaction[];
}

export const DailyRevenueChart = ({ transactions }: DailyRevenueChartProps) => {
    const data = useDailyRevenueData(transactions);

    // Calculate max revenue to determine Y-axis steps
    const maxRevenue = Math.max(...data[0].data.map(d => d.y));
    const yAxisStep = Math.ceil(maxRevenue / 4); // Divide into 4 steps (5 values including 0)
    const yAxisValues = [0, yAxisStep, yAxisStep * 2, yAxisStep * 3, yAxisStep * 4];

    // Get evenly spaced dates for X-axis
    const dates = data[0].data;
    const numPoints = dates.length;
    const xAxisDates = [
        dates[0].x,
        dates[Math.floor(numPoints / 2)].x,
        dates[numPoints - 1].x
    ];

    // Format date to "5 Jan" format
    const formatDate = (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div style={{ height: 320, overflow: 'visible' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: Math.ceil(maxRevenue),
                    stacked: false
                }}
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 20,
                    legendOffset: 50,
                    legendPosition: 'middle',
                    tickValues: xAxisDates,
                    format: formatDate
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 20,
                    legendOffset: 50,
                    legendPosition: 'middle',
                    format: (value) => `$${formatNumber(value)}`,
                    tickValues: yAxisValues
                }}
                enablePoints={false}
                useMesh={true}
                colors={[theme.colors.chartBlue]}
                lineWidth={2}
                enableGridX={false}
                enableGridY={true}
                gridYValues={yAxisValues}
                enableArea={true}
                areaOpacity={0.1}
                tooltip={({ point }) => {
                    return (
                        <div style={{
                            background: 'white',
                            color: 'black',
                            padding: '8px 12px',
                            border: `1px solid ${theme.colors.chartBorder}`,
                            borderRadius: '4px'
                        }}>
                            <strong>{formatDate(point.data.x as string)}</strong>
                            <div>${point.data.y.toLocaleString()}</div>
                        </div>
                    )
                }}
                theme={{
                    axis: {
                        legend: {
                            text: {
                                fontSize: 14,
                                fill: theme.colors.neutral_600
                            }
                        }
                    }
                }}
            />
        </div>
    );
}; 