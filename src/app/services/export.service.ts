import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

import { TransactionLogFilterParams } from '../models/transaction-log.model';

import { DownloadUrlResponse, ExportRequestResponse } from '../models/export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/export-requests';

  /**
   * Tạo yêu cầu export TRANSACTION_LOG.
   *
   * params chính là filter đang dùng để search.
   */
  createTransactionLogExport(params: TransactionLogFilterParams): Observable<ExportRequestResponse> {
    return this.http.post<ExportRequestResponse>(this.apiUrl, {
      exportType: 'TRANSACTION_LOG',
      params,
    });
  }

  getLatestPendingDownload(): Observable<ExportRequestResponse | null> {
    return this.http.get<ExportRequestResponse | null>(`${this.apiUrl}/latest-pending-download`);
  }

  /**
   * FE polling trạng thái.
   */
  getStatus(id: number): Observable<ExportRequestResponse> {
    return this.http.get<ExportRequestResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * 50 export gần nhất.
   */
  getMine(): Observable<ExportRequestResponse[]> {
    return this.http.get<ExportRequestResponse[]>(`${this.apiUrl}/mine`);
  }

  /**
   * Xin MinIO presigned URL.
   */
  getDownloadUrl(id: number): Observable<DownloadUrlResponse> {
    return this.http.get<DownloadUrlResponse>(`${this.apiUrl}/${id}/download-url`);
  }

  /**
   * Poll 5 giây/lần.
   *
   * Tự dừng khi:
   * COMPLETED hoặc ERROR.
   */
  pollUntilDone(id: number, intervalMs = 5000): Observable<ExportRequestResponse> {
    return timer(0, intervalMs).pipe(
      switchMap(() => this.getStatus(id)),

      takeWhile((response) => response.exportStatus !== 'COMPLETED' && response.exportStatus !== 'ERROR', true),
    );
  }
}
