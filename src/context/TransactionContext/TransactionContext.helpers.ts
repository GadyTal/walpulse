import { Transaction } from "../../types/transaction";

const API_URL = 'https://walpulse-server.onrender.com/transactions';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Invalid response format');
    }
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}
