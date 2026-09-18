import {
  Injectable,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';

import {
  TransactionLogRow,
  TransactionLogFilterParams,
} from '../models/transaction-log.model';


export interface TransactionLogPage {

  content: TransactionLogRow[];

  totalElements: number;

  totalPages: number;

  size: number;

  number: number;

  first: boolean;

  last: boolean;

  numberOfElements: number;
}


@Injectable({
  providedIn: 'root',
})
export class TransactionLogService {

  private readonly apiUrl =
    'http://localhost:8080/api/transaction-log';


  constructor(
    private readonly http: HttpClient
  ) { }


  /*
   * =========================
   * SEARCH
   * =========================
   *
   * API:
   * POST
   * /api/transaction-log/search
   */
  search(
    filters: TransactionLogFilterParams,
    page: number = 0,
    size: number = 10
  ): Observable<TransactionLogPage> {

    const request = {

      page,

      size,

      transactionCode:
        filters.transactionCode?.trim()
        || null,

      accountNo:
        filters.accountNo?.trim()
        || null,

      status:
        filters.status
        || null,

      minAmount:
        filters.minAmount
        ?? null,

      maxAmount:
        filters.maxAmount
        ?? null,

      fromDate:
        filters.fromDate
        || null,

      toDate:
        filters.toDate
        || null,
    };


    return this.http.post<TransactionLogPage>(`${this.apiUrl}/search-native-query`, request);
  }

  exportExcel(
    data: TransactionLogRow[]
  ): void {

  }
}