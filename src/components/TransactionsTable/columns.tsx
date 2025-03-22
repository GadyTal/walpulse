import { Column } from 'react-table';
import { Transaction, UtmSource } from '../../types/transaction';
import { formatCurrency } from '../../utils/numberFormatters';
import { formatDate } from '../../utils/dateFormatters';
import { capitalizeFirstLetter } from '../../utils/stringFormatters';
import { TruncatedCell, Tooltip, SourceIcon, GenderIcon } from './TransactionsTable.styles';
import { getCountryFlag } from '../../utils/countryUtils';

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const createColumns = (): Column<Transaction>[] => [
  {
    Header: 'Revenue (USD)',
    accessor: 'revenue_usd',
    Cell: ({ value }: { value: number }) => formatCurrency(value),
    minWidth: 120,
  },
  {
    Header: 'Date',
    accessor: 'transaction_time',
    Cell: ({ value }: { value: number }) => formatDate(value),
    minWidth: 100,
  },
  {
    Header: 'Source',
    accessor: 'utm_source',
    Cell: ({ value }: { value: UtmSource }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SourceIcon $source={value} />
        {capitalizeFirstLetter(value)}
      </div>
    ),
    minWidth: 120,
  },
  {
    Header: 'Country',
    accessor: row => row.customer_metadata.country,
    Cell: ({ value }: { value: string }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {getCountryFlag(value)}
        {capitalizeFirstLetter(value)}
      </div>
    ),
    minWidth: 100,
  },
  {
    Header: 'Gender',
    accessor: row => row.customer_metadata.gender,
    Cell: ({ value }: { value: string }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <GenderIcon $gender={value} />
        {capitalizeFirstLetter(value)}
      </div>
    ),
    minWidth: 100,
  },
  {
    Header: 'Device',
    accessor: row => row.customer_metadata.device,
    Cell: ({ value }: { value: string }) => capitalizeFirstLetter(value),
    minWidth: 100,
  },
  {
    Header: 'Customer ID',
    accessor: 'customer_id',
    Cell: ({ value }: { value: string }) => (
      <TruncatedCell>
        {truncateText(value, 7)}
        <Tooltip>{value}</Tooltip>
      </TruncatedCell>
    ),
    minWidth: 120,
  },
  {
    Header: 'Transaction ID',
    accessor: 'transaction_id',
    Cell: ({ value }: { value: string }) => (
      <TruncatedCell>
        {truncateText(value, 7)}
        <Tooltip>{value}</Tooltip>
      </TruncatedCell>
    ),
    minWidth: 120,
  },
]; 