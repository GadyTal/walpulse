import { useMemo } from 'react';
import { Row } from 'react-table';
import { Transaction } from '../../types/transaction';
import { formatCurrency } from '../../utils/numberFormatters';
import { formatDate } from '../../utils/dateFormatters';

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

export const useFilteredRows = (rows: Row<Transaction>[], searchTerm: string) => {
  return useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter(row => {
      const searchable = [
        row.original.transaction_id,
        row.original.customer_id,
        row.original.utm_source,
        row.original.customer_metadata.country,
        row.original.customer_metadata.gender,
        row.original.customer_metadata.device,
        formatCurrency(row.original.revenue_usd),
        formatDate(row.original.transaction_time),
        row.original.revenue_usd.toString(),
        row.original.customer_metadata.birthday_time.toString(),
      ].join(' ').toLowerCase();
      return searchable.includes(searchTerm.toLowerCase());
    });
  }, [rows, searchTerm]);
};

export const usePaginatedRows = (
  filteredRows: Row<Transaction>[],
  currentPage: number,
  pageSize: number
) => {
  return useMemo(() => {
    return filteredRows.slice(
      currentPage * pageSize,
      (currentPage + 1) * pageSize
    );
  }, [filteredRows, currentPage, pageSize]);
}; 