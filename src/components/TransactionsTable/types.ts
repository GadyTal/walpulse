import { Transaction } from '../../types/transaction';
import { HeaderGroup, TableInstance, TableState, ColumnInstance } from 'react-table';

// Extend the HeaderGroup type to include all required properties
export interface ResizableHeaderGroup extends HeaderGroup<Transaction> {
  getResizerProps: () => Record<string, unknown>;
  isResizing: boolean;
  isSorted: boolean;
  isSortedDesc: boolean;
  getSortByToggleProps: () => Record<string, unknown>;
}

// Extend the TableState type to include resizing state
export interface ResizableTableState extends TableState<Transaction> {
  columnResizing: {
    isResizingColumn: boolean | string;
    startX?: number;
    columnWidth?: number;
  };
}

// Extend the TableInstance type to include resizing state
export interface ResizableTableInstance extends Omit<TableInstance<Transaction>, 'state' | 'headers'> {
  state: ResizableTableState;
  headers: ResizableHeaderGroup[];
}

export interface ExtendedColumnInstance extends ColumnInstance<Transaction> {
  isVisible: boolean;
  toggleHidden: () => void;
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  initialPageSize?: number;
} 