import { LogoIcon } from '../Icons';
import { FilterGroup } from '../FilterGroup/FilterGroup';
import { AdditionalFilter } from '../AdditionalFilters/AdditionalFilters';
import { TimeFilter } from '../../types/filters';
import { TopRowContainer, TimeFiltersContainer, LogoContainer, ButtonsContainer } from './TopRow.styled';
import { RefreshButton } from '../Button/RefreshButton';
import { TransactionsButton } from '../TransactionsTable/TransactionsButton';



interface TopRowProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export const TopRow = ({
  activeFilter,
  onFilterChange,
}: TopRowProps) => {
  return (
    <TopRowContainer>
      <LogoContainer>
        <LogoIcon />
      </LogoContainer>
      <TimeFiltersContainer>
        <FilterGroup
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </TimeFiltersContainer>
      <ButtonsContainer>
        <RefreshButton />
        <TransactionsButton />
        <AdditionalFilter />
      </ButtonsContainer>
    </TopRowContainer>
  );
}; 