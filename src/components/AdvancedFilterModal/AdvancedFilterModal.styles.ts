import styled from 'styled-components';
import { media } from '../../styles/breakpoints';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 35vw;
  max-height: 90vh;
  overflow-y: auto;

  ${media.mobile`
    width: 90vw;
    padding: 16px;
  `}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.gray900};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${props => props.theme.colors.gray500};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.gray700};
  }
`;

export const ModalBody = styled.div`
  margin-bottom: 24px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid ${props => props.theme.colors.gray200};
`; 