import { UpArrow, DownArrow } from './Icons';
import { formatCurrency, formatNumber } from '../utils/numberFormatters';
import { StatCard, StatTitle, StatValueContainer, StatValue, ChangeIndicator } from './StatCard/StatCard.styled';

interface StatComponentProps {
  title: string;
  amount: number;
  change: number;
  isPositive: boolean;
}

export const StatComponent = ({ title, amount, change, isPositive }: StatComponentProps) => {
  const formattedValue = title.toLowerCase().includes('order') && !title.toLowerCase().includes('value')
    ? formatNumber(amount, { compact: false })
    : formatCurrency(amount);

  return (
    <StatCard>
      <StatTitle>{title}</StatTitle>
      <StatValueContainer>
        <StatValue>{formattedValue}</StatValue>
        <ChangeIndicator $isPositive={isPositive}>
          {isPositive ? <UpArrow /> : <DownArrow />}
          {Math.abs(change)}%
        </ChangeIndicator>
      </StatValueContainer>
    </StatCard>
  );
}; 