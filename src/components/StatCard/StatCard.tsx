import { StatsTrend } from '../../context/FiltersContext/FiltersContext.types';
import { StatCard as StyledCard, StatTitle, StatValue, ChangeIndicator, StatValueContainer } from './StatCard.styled';
import { formatNumber } from '../../utils/numberFormatters';
import { TextSkeleton } from '../Skeleton/Skeleton';
import styled from 'styled-components';

interface StatCardProps {
  title: string;
  value: number;
  change: number;
  trend: StatsTrend;
  prefix?: string;
  formatter?: (value: number) => string;
  isLoading?: boolean;
}

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

/**
 * StatCard Component
 * Displays a single stat with its title and change indicator
 */
export const StatCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  prefix = '', 
  formatter,
  isLoading 
}: StatCardProps) => {
  const formattedValue = formatter ? formatter(value) : formatNumber(value, { prefix });

  if (isLoading) {
    return (
      <StyledCard>
        <SkeletonContainer>
          <TextSkeleton width="100px" />
          <TextSkeleton width="150px" />
        </SkeletonContainer>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <StatTitle>{title}</StatTitle>
      <StatValueContainer>
        <StatValue>{formattedValue}</StatValue>
        {trend !== StatsTrend.Neutral &&
          <ChangeIndicator $isPositive={trend == StatsTrend.Up}>
            {trend == StatsTrend.Up ? '+' : ''}{change.toFixed(0)}%
          </ChangeIndicator>
        }
      </StatValueContainer>
    </StyledCard>
  );
}; 