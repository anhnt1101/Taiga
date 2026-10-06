export type ExportStatus = 'NEW' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export type DownloadStatus = 'NOT_DOWNLOADED' | 'DOWNLOADED';

export type ToastAction = 'export' | 'error' | 'success';

export interface ToastNotification {
  show: boolean;
  action: ToastAction;
  message?: string;
}

export interface ExportRequestResponse {
  id: number;
  exportType: string;
  exportStatus: ExportStatus;
  downloadStatus: DownloadStatus;
  fileName: string | null;
  path: string | null;
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

/*
 * Event backend gửi qua Redis -> WebSocket -> Angular.
 */
export interface ExportNotification {
  requestId: number;
  userId: number;
  exportStatus: ExportStatus;
  progress: number;
  fileName: string | null;
  message: string | null;
  timestamp: string | null;
}

export type ExportFileTab = 'ready' | 'downloaded' | 'all';

export interface ExportFileItem {
  id: number;
  fileName: string;
  status: ExportFileTab;
  createdAt: string;
  downloadedAt: string | null;
  downloadCount: number;
  recordCount: number | string;
  fileSize: string;
  filterSummary: string;
  raw: ExportRequestResponse;
}

export interface ExportProgressState {
  requestId: number | null;
  isExporting: boolean;
  isComplete: boolean;
  progressPercent: number;
  currentStepMessage: string;
  processedRecords: number;
  exportedFile: ExportFileItem | null;
}
