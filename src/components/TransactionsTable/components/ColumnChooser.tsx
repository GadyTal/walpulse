import React from 'react';
import { TableIcon } from '../../Icons';
import { ExtendedColumnInstance } from '../types';
import {
  ColumnChooserButton,
  ColumnChooserMenu,
  ColumnOption,
} from '../TransactionsTable.styles';

interface ColumnChooserProps {
  isOpen: boolean;
  onToggle: () => void;
  allColumns: ExtendedColumnInstance[];
  toggleColumnVisibility: (columnId: string) => void;
}

export const ColumnChooser: React.FC<ColumnChooserProps> = ({
  isOpen,
  onToggle,
  allColumns,
  toggleColumnVisibility,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <ColumnChooserButton onClick={onToggle}>
        <TableIcon />
        Columns
      </ColumnChooserButton>
      {isOpen && (
        <ColumnChooserMenu>
          {allColumns.map(column => (
            <ColumnOption key={column.id}>
              <input
                type="checkbox"
                checked={column.isVisible}
                onChange={() => toggleColumnVisibility(column.id)}
              />
              {column.Header as string}
            </ColumnOption>
          ))}
        </ColumnChooserMenu>
      )}
    </div>
  );
}; 