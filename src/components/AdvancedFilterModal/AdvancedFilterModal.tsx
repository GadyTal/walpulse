import { AdvancedFilters } from '../../types/filters';
import { FilterSection } from './components/FilterSection/FilterSection';
import { Button } from '../Button/Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
} from './AdvancedFilterModal.styles';
import { UtmSource, AgeGroup, Gender } from '../../types/transaction';
import { AvailableFilterOptions } from '../../context/FiltersContext/FiltersContext.types';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  onApplyFilters: (filters: AdvancedFilters) => void;
  onReset: () => void;
  availableOptions: AvailableFilterOptions;
}

export const AdvancedFilterModal = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onReset,
  availableOptions,
}: AdvancedFilterModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Advanced Filters</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <FilterSection
            title="Marketing Channels"
            options={availableOptions.utmSources as UtmSource[]}
            selectedValues={filters.utmSources}
            onChange={(values: string[]) => onApplyFilters({ ...filters, utmSources: values as UtmSource[] })}
          />
          <FilterSection
            title="Age Groups"
            options={availableOptions.ageGroups as AgeGroup[]}
            selectedValues={filters.ageGroups}
            onChange={(values: string[]) => onApplyFilters({ ...filters, ageGroups: values as AgeGroup[] })}
          />
          <FilterSection
            title="Gender"
            options={availableOptions.genders as Gender[]}
            selectedValues={filters.gender}
            onChange={(values: string[]) => onApplyFilters({ ...filters, gender: values as Gender[] })}
          />
          <FilterSection
            title="Countries"
            options={availableOptions.countries}
            selectedValues={filters.countries}
            onChange={(values: string[]) => onApplyFilters({ ...filters, countries: values as string[] })}
          />
        </ModalBody>
        <ModalFooter>
          <Button $variant="secondary" onClick={onReset}>
            Clear Filters
          </Button>
          <Button
            $variant="primary"
            onClick={() => {
              onApplyFilters(filters);
              onClose();
            }}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}; 