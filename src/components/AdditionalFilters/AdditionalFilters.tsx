import { useState } from 'react';
import { FilterIcon } from '../Icons';
import { AdvancedFilterModal } from '../AdvancedFilterModal/AdvancedFilterModal';
import { DEFAULT_ADVANCED_FILTERS } from '../../types/filters';
import { useFilters } from '../../context/FiltersContext/FilterContext';
import { StyledAdditionalFiltersButton } from './AdditionalFilters.styles';

export const AdditionalFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { advancedFilters, setAdvancedFilters, availableFilterOptions } = useFilters();

  const handleReset = () => {
    setAdvancedFilters(DEFAULT_ADVANCED_FILTERS);
  };

  const hasActiveFilters = 
    advancedFilters.utmSources.length > 0 ||
    advancedFilters.ageGroups.length > 0 ||
    advancedFilters.gender.length > 0 ||
    advancedFilters.countries.length > 0 ||
    advancedFilters.revenueRange.min !== DEFAULT_ADVANCED_FILTERS.revenueRange.min ||
    advancedFilters.revenueRange.max !== DEFAULT_ADVANCED_FILTERS.revenueRange.max;

  return (
    <>
      <StyledAdditionalFiltersButton 
        onClick={() => setIsModalOpen(true)}
        $isActive={hasActiveFilters}
      >
        <FilterIcon />
      </StyledAdditionalFiltersButton>
      <AdvancedFilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filters={advancedFilters}
        onApplyFilters={setAdvancedFilters}
        onReset={handleReset}
        availableOptions={availableFilterOptions}
      />
    </>
  );
}; 