import React from 'react';
import { SearchIcon } from '../../Icons';
import {
  SearchContainer,
  SearchInput,
  SearchIconWrapper,
} from '../TransactionsTable.styles';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      />
    </SearchContainer>
  );
}; 