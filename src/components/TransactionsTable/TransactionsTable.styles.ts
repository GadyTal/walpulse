import styled from 'styled-components';
import { UtmSource } from '../../types/transaction';

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
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
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

export const TableWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px ${props => props.theme.colors.shadow};
  overflow: hidden;
`;

export const TableControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  gap: 16px;
`;

export const TableControlsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.gray50};
  border: 1px solid ${props => props.theme.colors.gray200};
  border-radius: 8px;
  padding: 8px 12px;
  transition: all ${props => props.theme.transitions.speed} ease;
  width: 300px;

  &:focus-within {
    background: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.purple};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.purple}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.gray300};
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.gray400};
  margin-right: 8px;
  transition: color ${props => props.theme.transitions.speed} ease;

  ${SearchContainer}:focus-within & {
    color: ${props => props.theme.colors.purple};
  }
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  width: 100%;
  font-size: 14px;
  color: ${props => props.theme.colors.gray900};
  outline: none;

  &::placeholder {
    color: ${props => props.theme.colors.gray400};
  }
`;

export const TableButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray200};
  border-radius: 8px;
  color: ${props => props.theme.colors.gray700};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.speed} ease;

  &:hover {
    background: ${props => props.theme.colors.gray50};
    border-color: ${props => props.theme.colors.gray300};
    color: ${props => props.theme.colors.purple};
  }

  &:active {
    background: ${props => props.theme.colors.gray100};
    border-color: ${props => props.theme.colors.gray400};
  }

  svg {
    width: 16px;
    height: 16px;
    transition: color ${props => props.theme.transitions.speed} ease;
  }

  &:hover svg {
    color: ${props => props.theme.colors.purple};
  }
`;

export const ExportButton = styled(TableButton)`
  background: ${props => props.theme.colors.purple};
  color: ${props => props.theme.colors.white};
  border: none;

  &:hover {
    background: ${props => props.theme.colors.purpleDark};
    color: ${props => props.theme.colors.white};
    border: none;
  }

  &:active {
    background: ${props => props.theme.colors.purpleDarker};
    border: none;
  }

  svg {
    color: ${props => props.theme.colors.white};
  }

  &:hover svg {
    color: ${props => props.theme.colors.white};
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  position: relative;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

export const TableHeader = styled.th`
  padding: 16px;
  text-align: left;
  color: ${props => props.theme.colors.gray700};
  font-weight: 600;
  background: ${props => props.theme.colors.gray50};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  white-space: nowrap;
  cursor: pointer;
  transition: background ${props => props.theme.transitions.speed} ease;
  position: relative;

  &:hover {
    background: ${props => props.theme.colors.gray100};
  }
`;

export const TableRow = styled.tr`
  &:hover {
    background: ${props => props.theme.colors.backgroundGradient};
  }
`;

export const TableCell = styled.td`
  padding: 16px;
  color: ${props => props.theme.colors.gray700};
  border-bottom: 1px solid ${props => props.theme.colors.gray200};
  white-space: nowrap;
`;

interface SortIconProps {
  $isSorted?: boolean;
  $isSortedDesc?: boolean;
}

export const SortIcon = styled.span<SortIconProps>`
  display: inline-block;
  margin-left: 4px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  
  ${props => props.$isSorted && !props.$isSortedDesc && `
    border-bottom: 4px solid ${props.theme.colors.purple};
    border-top: none;
  `}
  
  ${props => props.$isSorted && props.$isSortedDesc && `
    border-top: 4px solid ${props.theme.colors.purple};
    border-bottom: none;
  `}
  
  ${props => !props.$isSorted && `
    border-top: 4px solid ${props.theme.colors.gray300};
    border-bottom: none;
  `}
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid ${props => props.theme.colors.gray200};
  
  span {
    color: ${props => props.theme.colors.gray700};
    font-size: 14px;
  }
`;

export const PageButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.speed} ease;
  border: 1px solid ${props => props.theme.colors.gray300};
  background: ${props => props.theme.colors.gray50};
  color: ${props => props.theme.colors.gray700};

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.gray100};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Source icon component
interface SourceIconProps {
  $source: UtmSource;
}

const getSourceColor = (props: SourceIconProps & { theme: any }) => {
  switch (props.$source) {
    case 'google':
      return props.theme.colors.google;
    case 'facebook':
      return props.theme.colors.facebook;
    case 'instagram':
      return props.theme.colors.instagram;
    case 'tiktok':
      return props.theme.colors.tiktok;
    case 'twitter':
      return props.theme.colors.twitter;
    case 'pinterest':
      return props.theme.colors.pinterest;
    case 'linkedin':
      return props.theme.colors.linkedin;
    default:
      return props.theme.colors.gray400;
  }
};

export const SourceIcon = styled.div<SourceIconProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${getSourceColor};
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

// Gender icon component
interface GenderIconProps {
  $gender: string;
}

export const GenderIcon = styled.div<GenderIconProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$gender === 'male' ? props.theme.colors.blue : props.theme.colors.pink};
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

// Country icon component
interface CountryIconProps {
  code: string;
}

export const CountryIcon = styled.div<CountryIconProps>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-image: ${props => `url(https://flagcdn.com/w20/${props.code}.png)`};
  background-size: cover;
  background-position: center;
`;

export const TruncatedCell = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover > div {
    visibility: visible;
    opacity: 1;
  }
`;

export const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: ${props => props.theme.colors.gray900};
  color: white;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  transition: all 0.2s ease;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props => props.theme.colors.gray900} transparent transparent transparent;
  }
`;

export const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: auto;
  color: ${props => props.theme.colors.gray700};
  font-size: 14px;
`;

export const PageSizeSelect = styled.select`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.gray300};
  background: ${props => props.theme.colors.gray50};
  color: ${props => props.theme.colors.gray700};
  font-size: 14px;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.speed} ease;

  &:hover {
    border-color: ${props => props.theme.colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.purple};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.purpleLight};
  }
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: ${props => props.theme.colors.gray100};
  cursor: col-resize;
  user-select: none;
  touch-action: none;

  &:hover {
    background: ${props => props.theme.colors.gray200};
  }

  &.resizing {
    background: ${props => props.theme.colors.purple};
  }
`;

export const ColumnChooserButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.gray300};
  border-radius: 6px;
  background: ${props => props.theme.colors.gray50};
  color: ${props => props.theme.colors.gray700};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.gray100};
  }
`;

export const ColumnChooserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: ${props => props.theme.colors.gray50};
  border: 1px solid ${props => props.theme.colors.gray200};
  border-radius: 8px;
  box-shadow: 0px 4px 6px ${props => props.theme.colors.shadow};
  padding: 8px;
  z-index: 1000;
`;

export const ColumnOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.gray700};
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.gray100};
  }

  input {
    margin: 0;
  }
`; 