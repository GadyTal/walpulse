import React from 'react';
import {
  Pagination as PaginationContainer,
  PageButton,
  PageSizeSelector,
  PageSizeSelect,
} from '../TransactionsTable.styles';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <PaginationContainer>
      <PageSizeSelector>
        <span>Show</span>
        <PageSizeSelect
          value={pageSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            onPageSizeChange(Number(e.target.value));
          }}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </PageSizeSelect>
        <span>entries</span>
      </PageSizeSelector>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </PageButton>
      <span>
        Page {currentPage + 1} of {pageCount}
      </span>
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount - 1}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
}; 