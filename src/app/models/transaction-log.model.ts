export type TransactionStatus = 'SUCCESS' | 'FAILED';

export interface TransactionLogRow {
  id: number;
  transactionCode: string;
  accountNo: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionLogFilterParams {
  page?: number;
  size?: number;
  transactionCode?: string;
  accountNo?: string;
  status?: TransactionStatus | '';
  fromDate?: string;
  toDate?: string;
  minAmount?: number | null;
  maxAmount?: number | null;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
