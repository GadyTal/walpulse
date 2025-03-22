import styled from 'styled-components';
import { ErrorContainer } from '../../styles/StyledComponents';

export const ErrorMessage = styled(ErrorContainer)`
  padding: 2rem;
  flex-direction: column;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    cursor: pointer;
    transition: background ${props => props.theme.transitions.speed};

    &:hover {
      background: ${props => props.theme.colors.activeBlue};
    }
  }
`; 