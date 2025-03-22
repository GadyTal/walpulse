import React, { createContext, useContext, useState, useCallback } from 'react';
import { Transaction } from '../../types/transaction';
import { TransactionContextType } from './TransactionContext.types';
import { fetchTransactions } from './TransactionContext.helpers';

// TransactionContext provides a centralized state management for transaction data
// This eliminates the need to pass transaction data through multiple component levels
// and ensures consistent data access across the application
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core transaction state management
  // - transactions: stores the raw transaction data from the API
  // - loading: indicates if we're currently fetching transaction data
  // - error: stores any API or processing errors
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Memoize the data fetching function to maintain referential stability
  // This is crucial for the useEffect dependency array and prevents unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value: TransactionContextType = {
    loading,
    error: error || '',
    transactions,
    refetchTransactions: fetchData
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook for accessing transaction context
// Provides type-safe access to transaction data and controls
// Throws an error if used outside of TransactionProvider
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}; 