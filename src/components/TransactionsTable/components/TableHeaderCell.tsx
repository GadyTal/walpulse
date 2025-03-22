import React from 'react';
import { ResizableHeaderGroup } from '../types';
import {
  TableHeader,
  SortIcon,
  ResizeHandle,
} from '../TransactionsTable.styles';

interface TableHeaderProps {
  column: ResizableHeaderGroup;
}

export const TableHeaderCell: React.FC<TableHeaderProps> = ({ column }) => {
  const { key, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps?.());
  const { style, ...restColumnProps } = columnProps;

  return (
    <TableHeader
      key={key}
      {...restColumnProps}
      style={{
        ...style,
        width: column.width,
        position: 'relative',
      }}
    >
      {column.render('Header') as string}
      <SortIcon
        $isSorted={column.isSorted}
        $isSortedDesc={column.isSortedDesc}
      />
      <ResizeHandle
        {...column.getResizerProps()}
        className={column.isResizing ? 'resizing' : ''}
      />
    </TableHeader>
  );
}; 