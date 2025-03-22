import React from 'react';
import { Row } from 'react-table';
import { Transaction } from '../../../types/transaction';
import {
  TableRow as StyledTableRow,
  TableCell,
} from '../TransactionsTable.styles';

interface TableRowProps {
  row: Row<Transaction>;
  prepareRow: (row: Row<Transaction>) => void;
}

export const TableRow: React.FC<TableRowProps> = ({ row, prepareRow }) => {
  prepareRow(row);
  const { key, ...rowProps } = row.getRowProps();

  return (
    <StyledTableRow key={key} {...rowProps}>
      {row.cells.map(cell => {
        const { key, ...cellProps } = cell.getCellProps();
        return (
          <TableCell
            key={key}
            {...cellProps}
            style={{
              width: cell.column.width,
            }}
          >
            {cell.render('Cell') as React.ReactElement}
          </TableCell>
        );
      })}
    </StyledTableRow>
  );
}; 