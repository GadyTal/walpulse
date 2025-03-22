import { useState } from 'react';
import { StyledRoundIconButton } from '../Button/Button.styled';
import { TableIcon } from '../Icons';
import { TransactionsModal } from './TransactionsModal';
import { useFilters } from '../../context/FiltersContext/FilterContext';
import { media } from '../../styles/breakpoints';
import { styled } from 'styled-components';

const StyledTransactionsButton = styled(StyledRoundIconButton)`
  ${media.mobile`
    display: none;
  `}
`;

export const TransactionsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filteredTransactions } = useFilters();

  return (
    <>
      <StyledTransactionsButton
        onClick={() => setIsModalOpen(true)}
        role="button"
        title="View transactions table"
        tabIndex={0}
      >
        <TableIcon />
      </StyledTransactionsButton>
      <TransactionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactions={filteredTransactions}
      />
    </>
  );
}; 