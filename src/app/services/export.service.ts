import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TransactionLogFilterParams } from '../models/transaction-log.model';

import { DownloadUrlResponse, ExportRequestResponse } from '../models/export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/export-requests';

  /**
   * =====================================================
   * CREATE TRANSACTION LOG EXPORT
   * =====================================================
   *
   * Tạo yêu cầu export.
   *
   * Flow backend:
   *
   * Angular
   *   ↓
   * POST /api/export-requests
   *   ↓
   * EXPORT_REQUEST = NEW
   *   ↓
   * Kafka
   *   ↓
   * Worker
   */
  createTransactionLogExport(params: TransactionLogFilterParams): Observable<ExportRequestResponse> {
    return this.http.post<ExportRequestResponse>(this.apiUrl, {
      exportType: 'TRANSACTION_LOG',

      params,
    });
  }

  /**
   * =====================================================
   * GET EXPORT STATUS
   * =====================================================
   *
   * Không còn dùng để polling.
   *
   * Chỉ dùng khi cần lấy lại dữ liệu đầy đủ
   * của một export cụ thể.
   *
   * Ví dụ:
   * WebSocket báo COMPLETED
   * => gọi GET status đúng 1 lần.
   */
  getStatus(id: number): Observable<ExportRequestResponse> {
    return this.http.get<ExportRequestResponse>(`${this.apiUrl}/${id}`);
  }

  /**
   * =====================================================
   * GET MY EXPORT REQUESTS
   * =====================================================
   *
   * Dùng cho:
   *
   * "Danh sách file xuất"
   *
   * API:
   *
   * GET /api/export-requests/mine
   */
  getMyRequests(): Observable<ExportRequestResponse[]> {
    return this.http.get<ExportRequestResponse[]>(`${this.apiUrl}/mine`);
  }

  /**
   * =====================================================
   * GET DOWNLOAD URL
   * =====================================================
   *
   * Xin MinIO Presigned URL.
   *
   * Browser sẽ tải trực tiếp từ MinIO.
   */
  getDownloadUrl(id: number): Observable<DownloadUrlResponse> {
    return this.http.get<DownloadUrlResponse>(`${this.apiUrl}/${id}/download-url`);
  }
}
