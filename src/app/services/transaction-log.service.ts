import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PageResponse, TransactionLogFilterParams, TransactionLogRow } from '../models/transaction-log.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionLogService {
  private readonly apiUrl = 'http://localhost:8080/api/transaction-log';

  constructor(private readonly http: HttpClient) {}

  search(filters: TransactionLogFilterParams, page: number, size: number): Observable<PageResponse<TransactionLogRow>> {
    const request = {
      page,
      size,
      transactionCode: filters.transactionCode?.trim() || null,
      accountNo: filters.accountNo?.trim() || null,
      status: filters.status || null,
      minAmount: filters.minAmount ?? null,
      maxAmount: filters.maxAmount ?? null,
      fromDate: filters.fromDate || null,
      toDate: filters.toDate || null,
    };

    return this.http.post<PageResponse<TransactionLogRow>>(`${this.apiUrl}/search-native-query`, request);
  }
}
