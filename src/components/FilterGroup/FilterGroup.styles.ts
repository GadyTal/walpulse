import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

export const StyledFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(props) => props.theme.colors.background};
  padding: 4px;
  border-radius: 100px;
  box-shadow: 0px 1px 2px ${props => props.theme.colors.shadow};
  justify-content: space-around;
  padding: 8px;
`;

export const StyledFilterButton = styled.div<{ $isActiveFilter?: boolean }>`
  border: none;
  background: ${(props) => (props.$isActiveFilter ? props.theme.colors.backgroundGradient : "transparent")};
  color: ${(props) =>
    props.$isActiveFilter
      ? props.theme.colors.activeBlue
      : props.theme.colors.neutral_600};
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActiveFilter ? 700 : 500)};
  line-height: 150%;
  cursor: pointer;
  transition: all ${(props) => props.theme.transitions.speed} ease;
  white-space: nowrap;
  width: 33%;
  text-align: center;

  &:hover {
    background: ${(props) => props.theme.colors.backgroundGradient};
  }

  ${media.mobile`
    font-size: 14px;
    padding: 4px 8px;
  `}
`;
