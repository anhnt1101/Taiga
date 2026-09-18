export type TransactionStatus = 'SUCCESS' | 'FAILED';

/*
 * Dữ liệu TRANSACTION_LOG
 */
export interface TransactionLogRow {
  id: number;

  transactionCode: string;

  accountNo: string;

  amount: number;

  status: TransactionStatus;

  createdAt: string;
}

/*
 * Điều kiện tìm kiếm
 */
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

/*
 * Thống kê giao dịch
 *
 * Các giá trị này được tính từ
 * TRANSACTION_LOG, không phải
 * cột trong database.
 */
export interface TransactionSummaryStats {
  totalCount: number;

  totalAmount: number;

  successCount: number;

  pendingCount: number;

  failedCount: number;

  reversedCount: number;
}
