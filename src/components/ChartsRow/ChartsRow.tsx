import { ChannelDistributionChart } from '../charts/ChannelDistributionChart/ChannelDistributionChart'
import { DailyRevenueChart } from '../charts/DailyRevenueChart/DailyRevenueChart'
import { StyledChartsContainer, StyledChartContainer, StyledChartsTitle } from './ChartsRow.styles'
import { UtmSourceAgeGroupChart } from '../charts/UtmSourceAgeGroupChart/UtmSourceAgeGroupChart'
import { useFilters } from '../../context/FiltersContext/FilterContext'
import { useTransactions } from '../../context/TransactionContext/TransactionContext'
import { ChartSkeleton } from '../Skeleton/Skeleton'
import styled from 'styled-components'

const SkeletonChartContainer = styled(StyledChartContainer)`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SkeletonTitle = styled.div`
  width: 200px;
  height: 24px;
  background: ${props => props.theme.colors.secondary};
  border-radius: 4px;
`;

export const ChartsRow = () => {
    const { filteredTransactions } = useFilters();
    const { loading } = useTransactions();

    if (loading) {
        return (
            <StyledChartsContainer>
                <SkeletonChartContainer $spanTwoRows>
                    <SkeletonTitle />
                    <ChartSkeleton />
                </SkeletonChartContainer>
                <SkeletonChartContainer>
                    <SkeletonTitle />
                    <ChartSkeleton />
                </SkeletonChartContainer>
                <SkeletonChartContainer>
                    <SkeletonTitle />
                    <ChartSkeleton />
                </SkeletonChartContainer>
            </StyledChartsContainer>
        );
    }

    return (
        <StyledChartsContainer>
            <StyledChartContainer $spanTwoRows>
                <StyledChartsTitle>UTM Source / Age Group</StyledChartsTitle>
                <UtmSourceAgeGroupChart transactions={filteredTransactions} />
            </StyledChartContainer>

            <StyledChartContainer>
                <StyledChartsTitle>UTM Source / Revenue Attribution</StyledChartsTitle>
                <ChannelDistributionChart transactions={filteredTransactions} />
            </StyledChartContainer>

            <StyledChartContainer>
                <StyledChartsTitle>Revenue Trend</StyledChartsTitle>
                <DailyRevenueChart transactions={filteredTransactions} />
            </StyledChartContainer>
        </StyledChartsContainer>
    )
} 