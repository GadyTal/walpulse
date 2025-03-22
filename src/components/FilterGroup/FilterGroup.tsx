
import { TimeFilter } from '../../types/filters';
import { FILTER_OPTIONS } from './FilterGroup.helpers';
import { StyledFilterButton, StyledFilterGroup } from './FilterGroup.styles';

interface FilterGroupProps {
  activeFilter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

export const FilterGroup = ({ activeFilter, onFilterChange }: FilterGroupProps) => {
  return (
    <StyledFilterGroup>
      {FILTER_OPTIONS.map(({ value, label }) => (
        <StyledFilterButton
          key={value}
          $isActiveFilter={activeFilter === value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </StyledFilterButton>
      ))}
    </StyledFilterGroup>
  );
}; 