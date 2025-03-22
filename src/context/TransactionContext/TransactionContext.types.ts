import { Transaction } from "../../types/transaction";

export interface TransactionContextType {
  loading: boolean;
  error: string;
  transactions: Transaction[];
  refetchTransactions: () => Promise<void>;
}
