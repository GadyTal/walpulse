import { useTransactions } from '../../context/TransactionContext/TransactionContext';
import { StyledRoundIconButton } from './Button.styled';
import { RefreshIcon } from '../Icons/RefreshIcon';

export const RefreshButton = () => {
  const { refetchTransactions, loading } = useTransactions();

  return (
    <StyledRoundIconButton 
      onClick={loading ? undefined : refetchTransactions}
      $isLoading={loading}
      role="button"
      title="Refresh data"
      tabIndex={loading ? -1 : 0}
    >
      <RefreshIcon />
    </StyledRoundIconButton>
  );
}; 