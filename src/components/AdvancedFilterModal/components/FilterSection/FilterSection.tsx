import { UtmSource, AgeGroup, Gender } from '../../../../types/transaction';
import { capitalizeFirstLetter } from '../../../../utils/stringFormatters';
import { getCountryFlag } from '../../../../utils/countryUtils';
import { Section, SectionTitle, FilterGrid, FilterChip } from './FilterSection.styles';

interface FilterSectionProps {
  title: string;
  options: (UtmSource | AgeGroup | Gender | string)[];
  selectedValues: (UtmSource | AgeGroup | Gender | string)[];
  onChange: (values: (UtmSource | AgeGroup | Gender | string)[]) => void;
}

export const FilterSection = ({ title, options, selectedValues, onChange }: FilterSectionProps) => {
  const toggleValue = (value: UtmSource | AgeGroup | Gender | string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <FilterGrid>
        {options.map((option) => (
          <FilterChip
            key={option}
            $isSelected={selectedValues.includes(option)}
            onClick={() => toggleValue(option)}
          >
            {title === 'Countries' && getCountryFlag(option)}
            {capitalizeFirstLetter(option)}
          </FilterChip>
        ))}
      </FilterGrid>
    </Section>
  );
}; 