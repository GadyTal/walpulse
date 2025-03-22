import styled from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;

  ${(props) =>
    props.$variant === 'primary'
      ? `
        background: ${props.theme.colors.purple};
        color: white;
        &:hover {
          background: ${props.disabled ? props.theme.colors.purple : props.theme.colors.purpleDark};
        }
      `
      : `
        background: ${props.disabled ? props.theme.colors.white : props.theme.colors.gray50};
        color: ${props.theme.colors.gray700};
        border: 1px solid ${props.theme.colors.gray300};
        &:hover {
          background: ${props.disabled ? props.theme.colors.white : props.theme.colors.gray50};
        }
      `}

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const Button = ({ $variant = 'primary', disabled = false, onClick, children }: ButtonProps) => {
  return (
    <StyledButton $variant={$variant} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}; 