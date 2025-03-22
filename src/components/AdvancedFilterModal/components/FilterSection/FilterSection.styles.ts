import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #344054;
  margin-bottom: 12px;
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
`;

export const FilterChip = styled.button<{ $isSelected: boolean }>`
  padding: 8px 12px;
  border-radius: 16px;
  border: 1px solid ${(props) => (props.$isSelected ? props.theme.colors.purple : props.theme.colors.gray300)};
  background: ${(props) => (props.$isSelected ? props.theme.colors.purpleLight : props.theme.colors.white)};
  color: ${(props) => (props.$isSelected ? props.theme.colors.purple : props.theme.colors.gray700)};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.$isSelected ? props.theme.colors.purpleLight : props.theme.colors.gray50)};
  }
`;