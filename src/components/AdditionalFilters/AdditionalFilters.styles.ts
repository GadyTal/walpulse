import styled from 'styled-components';
import { StyledRoundIconButton } from '../Button/Button.styled';

export const StyledAdditionalFiltersButton = styled(StyledRoundIconButton)<{ $isActive?: boolean }>`
  background: ${props => props.$isActive ? props.theme.colors.purpleLight : props.theme.colors.background};
  color: ${props => props.$isActive ? props.theme.colors.purple : props.theme.colors.gray700};
  border: 1px solid ${props => props.$isActive ? props.theme.colors.purple : 'transparent'};
  transition: all ${props => props.theme.transitions.speed} ease;

  svg {
    path {
      fill: ${props => props.$isActive ? props.theme.colors.purple : props.theme.colors.neutral_800};
    }
  }

  &:hover {
    background: ${props => props.$isActive ? props.theme.colors.purpleLight : props.theme.colors.gray50};
  }
`;