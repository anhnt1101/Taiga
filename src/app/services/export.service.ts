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

  createTransactionLogExport(params: TransactionLogFilterParams): Observable<ExportRequestResponse> {
    return this.http.post<ExportRequestResponse>(this.apiUrl, {
      exportType: 'TRANSACTION_LOG',
      params,
    });
  }

  getStatus(id: number): Observable<ExportRequestResponse> {
    return this.http.get<ExportRequestResponse>(`${this.apiUrl}/${id}`);
  }

  getMyRequests(): Observable<ExportRequestResponse[]> {
    return this.http.get<ExportRequestResponse[]>(`${this.apiUrl}/mine`);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getDownloadUrl(id: number): Observable<DownloadUrlResponse> {
    return this.http.get<DownloadUrlResponse>(`${this.apiUrl}/${id}/download-url`);
  }
}
