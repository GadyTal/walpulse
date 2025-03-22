import styled, { keyframes, css } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledButton = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.background};
  color: #344054;
  cursor: ${(props) => (props.$isLoading ? "not-allowed" : "pointer")};
  transition: all ${(props) => props.theme.transitions.speed} ease;

  svg {
    width: 20px;
    height: 20px;
    ${(props) =>
      props.$isLoading &&
      css`
        animation: ${spin} 1s linear infinite;
      `}
  }

  &:hover {
    background: #f9fafb;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledRoundIconButton = styled(StyledButton)`
  width: 58px;
  height: 58px;
  padding: 0;
`;
