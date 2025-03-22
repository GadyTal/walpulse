import React from 'react';
import { Transaction } from '../../types/transaction';
import { TransactionsTable } from './TransactionsTable';
import { Button } from '../Button/Button';
import { ModalOverlay, ModalContent, ModalBody, ModalFooter } from './TransactionsTable.styles';


interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalBody>
          <TransactionsTable transactions={transactions} />
        </ModalBody>
        <ModalFooter>
          <Button $variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}; 