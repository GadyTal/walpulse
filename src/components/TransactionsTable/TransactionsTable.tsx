import React, { useState, useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useResizeColumns,
  useColumnOrder,
  TableOptions,
  Row,
} from 'react-table';
import { Transaction } from '../../types/transaction';
import {
  TableContainer,
  StyledTable,
  TableWrapper,
  TableControls,
  TableControlsGroup,
} from './TransactionsTable.styles';
import { ResizableTableInstance, ExtendedColumnInstance, TransactionsTableProps, ResizableHeaderGroup } from './types';
import { createColumns } from './columns';
import { useFilteredRows, usePaginatedRows, PAGE_SIZE_OPTIONS } from './hooks';
import { TableHeaderCell, TableRow, ColumnChooser, SearchBar, Pagination, ExportButton } from './components';

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  initialPageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isColumnChooserOpen, setIsColumnChooserOpen] = useState(false);

  const columns = useMemo(() => createColumns(), []);

  const defaultColumn = useMemo(
    () => ({
      minWidth: 100,
      width: 150,
    }),
    []
  );

  const tableInstance = useTable<Transaction>(
    {
      columns,
      data: transactions,
      defaultColumn,
    } as TableOptions<Transaction>,
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    useColumnOrder
  ) as unknown as ResizableTableInstance;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    state: { columnResizing },
  } = tableInstance;

  const filteredRows = useFilteredRows(rows, searchTerm);
  const paginatedRows = usePaginatedRows(filteredRows, currentPage, pageSize);
  const pageCount = Math.ceil(filteredRows.length / pageSize);

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // Update column visibility
  const toggleColumnVisibility = (columnId: string) => {
    const column = allColumns.find(col => col.id === columnId) as ExtendedColumnInstance;
    if (column) {
      column.toggleHidden();
    }
  };

  return (
    <TableWrapper>
      <TableControls>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TableControlsGroup>
          <ExportButton transactions={filteredRows.map(row => row.original)} />
          <ColumnChooser
            isOpen={isColumnChooserOpen}
            onToggle={() => setIsColumnChooserOpen(!isColumnChooserOpen)}
            allColumns={allColumns as ExtendedColumnInstance[]}
            toggleColumnVisibility={toggleColumnVisibility}
          />
        </TableControlsGroup>
      </TableControls>
      <TableContainer>
        <StyledTable {...getTableProps()} style={{ width: columnResizing.isResizingColumn ? 'auto' : '100%' }}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...headerGroupProps}>
                  {(headerGroup.headers as ResizableHeaderGroup[]).map(column => (
                    <TableHeaderCell key={column.id} column={column} />
                  ))}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {paginatedRows.map((row: Row<Transaction>) => (
              <TableRow key={row.id} row={row} prepareRow={prepareRow} />
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size: number) => {
          setPageSize(size);
          setCurrentPage(0);
        }}
      />
    </TableWrapper>
  );
}; 