export type ExportStatus = 'NEW' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export type DownloadStatus = 'NOT_DOWNLOADED' | 'DOWNLOADED';

export interface ExportRequestResponse {
  id: number;

  exportType: string;

  exportStatus: ExportStatus;

  downloadStatus: DownloadStatus;

  fileName: string | null;

  errorMessage: string | null;

  createdDate: string;

  startedDate: string | null;

  completedDate: string | null;

  downloadedDate: string | null;
}

export interface DownloadUrlResponse {
  url: string;
  expiresAt: string;
}
