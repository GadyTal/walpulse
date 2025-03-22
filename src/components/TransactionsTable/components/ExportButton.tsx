import React from 'react';
import { ExportButton as StyledExportButton } from '../TransactionsTable.styles';
import { ExportIcon } from '../../Icons';
import { Transaction } from '../../../types/transaction';

interface ExportButtonProps {
  transactions: Transaction[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ transactions }) => {
  const handleExport = () => {
    // Create CSV headers
    const headers = [
      'Revenue (USD)',
      'Date',
      'Source',
      'Country',
      'Gender',
      'Device',
      'Customer ID',
      'Transaction ID'
    ];

    // Transform transactions to CSV rows
    const rows = transactions.map(transaction => [
      transaction.revenue_usd.toString(),
      new Date(transaction.transaction_time * 1000).toISOString(),
      transaction.utm_source,
      transaction.customer_metadata.country,
      transaction.customer_metadata.gender,
      transaction.customer_metadata.device,
      transaction.customer_id,
      transaction.transaction_id
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <StyledExportButton onClick={handleExport}>
      <ExportIcon />
      Export
    </StyledExportButton>
  );
}; 