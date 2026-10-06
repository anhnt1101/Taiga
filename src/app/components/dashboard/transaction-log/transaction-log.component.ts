import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TransactionLogFilterParams } from '../../../models/transaction-log.model';
import { ExportService } from '../../../services/export.service';
import { ExportWebSocketService } from '../../../services/export-websocket.service';
import {
  ExportFileItem,
  ExportFileTab,
  ExportNotification,
  ExportProgressState,
  ExportRequestResponse,
} from '../../../models/export.model';
import { TransactionLogFilterComponent } from './transaction-log-filter.component';
import { TransactionLogTableComponent } from './transaction-log-table.component';
import { ToastAction, ToastNotification } from '../../../models/export.model';

@Component({
  selector: 'ph-transaction-log',
  standalone: true,
  imports: [CommonModule, TransactionLogFilterComponent, TransactionLogTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-log.component.html',
  styleUrl: './transaction-log.component.scss',
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  private readonly exportService = inject(ExportService);
  private readonly exportWebSocket = inject(ExportWebSocketService);
  private readonly destroyRef = inject(DestroyRef);
  readonly filters = signal<TransactionLogFilterParams>({
    transactionCode: '',
    accountNo: '',
    status: '',
    minAmount: null,
    maxAmount: null,
    fromDate: '',
    toDate: '',
  });
  readonly totalElements = signal<number>(0);
  readonly exporting = signal<boolean>(false);
  readonly downloading = signal<boolean>(false);
  readonly currentExport = signal<ExportRequestResponse | null>(null);
  readonly toastNotification = signal<ToastNotification | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  readonly exportProgress = signal<ExportProgressState | null>(null);
  private readonly exportRecordCounts = new Map<number, number>();
  private readonly exportFilterSummaries = new Map<number, string>();
  readonly exportFiles = signal<ExportFileItem[]>([]);
  readonly exportDrawerOpen = signal<boolean>(false);
  readonly exportFileActiveTab = signal<ExportFileTab>('ready');
  readonly exportFileSearchKeyword = signal<string>('');
  private readonly hiddenExportFileIds = signal<Set<number>>(new Set<number>());
  readonly readyExportFiles = computed(() => this.exportFiles().filter((file) => file.status === 'ready'));
  readonly readyExportFilesCount = computed(() => this.readyExportFiles().length);
  readonly displayedExportFiles = computed(() => {
    const activeTab = this.exportFileActiveTab();
    const keyword = this.exportFileSearchKeyword().trim().toLowerCase();
    let files = this.exportFiles();
    if (activeTab === 'ready') {
      files = files.filter((file) => file.status === 'ready');
    } else if (activeTab === 'downloaded') {
      files = files.filter((file) => file.status === 'downloaded');
    }
    if (keyword) {
      files = files.filter((file) => file.fileName.toLowerCase().includes(keyword));
    }
    return files;
  });

  toggleDrawer(open?: boolean): void {
    if (typeof open === 'boolean') {
      this.exportDrawerOpen.set(open);
    } else {
      this.exportDrawerOpen.update((value) => !value);
    }
    if (this.exportDrawerOpen()) {
      this.loadExportFiles();
    }
  }

  dismissProgressModal(): void {
    this.exportProgress.set(null);
  }

  ngOnInit(): void {
    this.exportWebSocket.messages$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((message) => {
      this.handleExportMessage(message);
    });

    this.exportWebSocket.connect();
    this.loadExportFiles();
  }

  ngOnDestroy(): void {
    this.closeToast();
    this.exportWebSocket.disconnect();
  }

  onFiltersApplied(value: TransactionLogFilterParams): void {
    this.filters.set(value);
  }

  onFilterValidationError(message: string): void {
    this.showToast('error', message);
  }

  onTotalElementsChange(total: number): void {
    this.totalElements.set(total);
  }

  private handleExportMessage(message: ExportNotification): void {
    const current = this.currentExport();

    // Không phải request export hiện tại
    if (!current || current.id !== message.requestId) {
      return;
    }

    const progress = Math.max(0, Math.min(100, Math.round(Number(message.progress ?? 0))));

    if (message.exportStatus === 'PROCESSING') {
      this.exporting.set(true);

      this.exportProgress.set({
        requestId: message.requestId,
        isExporting: true,
        isComplete: false,
        progressPercent: progress,
        currentStepMessage: message.message || `Đang xuất ${progress}%`,
        processedRecords: 0,
        exportedFile: null,
      });

      return;
    }

    if (message.exportStatus === 'COMPLETED') {
      this.exporting.set(false);

      this.exportProgress.update((current) => ({
        requestId: message.requestId,
        isExporting: false,
        isComplete: true,
        progressPercent: 100,
        currentStepMessage: message.message || 'File Excel đã sẵn sàng',
        processedRecords: current?.processedRecords ?? 0,
        exportedFile: null,
      }));
      this.loadExportFiles();
      this.showToast('success', 'Xuất file thành công có thể tải');
      return;
    }

    if (message.exportStatus === 'ERROR') {
      this.exporting.set(false);

      this.exportProgress.update((current) => ({
        requestId: message.requestId,
        isExporting: false,
        isComplete: false,
        progressPercent: current?.progressPercent ?? progress,
        currentStepMessage: message.message || 'Xuất Excel thất bại',
        processedRecords: current?.processedRecords ?? 0,
        exportedFile: null,
      }));
    }
  }

  private showToast(action: ToastAction, message?: string): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastNotification.set({
      show: true,
      action,
      message,
    });

    this.toastTimer = setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  closeToast(): void {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);

      this.toastTimer = null;
    }

    this.toastNotification.set(null);
  }

  //EXPORT EXCEL
  onExportExcel(): void {
    if (this.exporting() || this.downloading()) {
      return;
    }
    const filters = this.filters();
    const exportParams: TransactionLogFilterParams = {
      transactionCode: filters.transactionCode?.trim() || '',
      accountNo: filters.accountNo?.trim() || '',
      status: filters.status || '',
      minAmount: filters.minAmount,
      maxAmount: filters.maxAmount,
      fromDate: filters.fromDate || '',
      toDate: filters.toDate || '',
    };

    const recordCount = this.totalElements();
    this.currentExport.set(null);
    this.exporting.set(true);
    this.exportProgress.set({
      requestId: null,
      isExporting: true,
      isComplete: false,
      progressPercent: 0,
      currentStepMessage: 'Đang tạo yêu cầu xuất Excel...',
      processedRecords: 0,
      exportedFile: null,
    });

    this.exportService
      .createTransactionLogExport(exportParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.currentExport.set(response);
          this.exportRecordCounts.set(response.id, recordCount);
          this.exportFilterSummaries.set(response.id, this.buildFilterSummary(exportParams));
          this.exportProgress.set({
            requestId: response.id,
            isExporting: true,
            isComplete: false,
            progressPercent: 0,
            currentStepMessage: 'Đang chờ Kafka xử lý...',
            processedRecords: 0,
            exportedFile: null,
          });
        },
        error: (error) => {
          console.error('[TRANSACTION LOG] CREATE EXPORT ERROR', error);
          this.exporting.set(false);
          this.exportProgress.set(null);
          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tạo yêu cầu xuất Excel'));
        },
      });
  }

  private loadExportFiles(): void {
    this.exportService
      .getMyRequests()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const hiddenIds = this.hiddenExportFileIds();
          const files = (response ?? [])
            .filter((item) => item.exportStatus === 'COMPLETED')
            .filter((item) => !hiddenIds.has(item.id))
            .map((item) => this.toExportFile(item))
            .sort((a, b) => b.id - a.id);
          this.exportFiles.set(files);
        },
        error: (error) => {
          console.error('[EXPORT FILES] LOAD ERROR', error);
        },
      });
  }

  private toExportFile(item: ExportRequestResponse): ExportFileItem {
    const downloaded = item.downloadStatus === 'DOWNLOADED';
    return {
      id: item.id,
      fileName: item.fileName || `export_${item.id}.xlsx`,
      status: downloaded ? 'downloaded' : 'ready',
      createdAt: this.formatDateTime(item.createdDate),
      downloadedAt: item.downloadedDate ? this.formatDateTime(item.downloadedDate) : null,
      downloadCount: downloaded ? 1 : 0,
      recordCount: this.exportRecordCounts.get(item.id) ?? '—',
      fileSize: '',
      filterSummary: this.exportFilterSummaries.get(item.id) ?? '',
      raw: item,
    };
  }

  onExportFileSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.exportFileSearchKeyword.set(input.value);
  }

  onClearExportFileSearch(): void {
    this.exportFileSearchKeyword.set('');
  }

  onDeleteExportFile(id: number): void {
    const next = new Set(this.hiddenExportFileIds());
    next.add(id);
    this.hiddenExportFileIds.set(next);
    this.exportFiles.update((files) => files.filter((file) => file.id !== id));
  }

  //DOWNLOAD
  onDownloadExportFile(file: ExportFileItem): void {
    if (this.downloading()) {
      return;
    }
    this.downloading.set(true);
    this.exportService
      .getDownloadUrl(file.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.downloading.set(false);
          this.triggerBrowserDownload(response.url, file.fileName);
          this.loadExportFiles();
          this.exportService.deleteRequest(file.id).subscribe();

          this.showToast('export', 'Tải file thành công');
        },
        error: (error) => {
          this.downloading.set(false);
          console.error('[TRANSACTION LOG] DOWNLOAD ERROR', error);
          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tải file Excel'));
        },
      });
  }

  private triggerBrowserDownload(url: string, fileName?: string | null): void {
    const link = document.createElement('a');
    link.href = url;
    link.rel = 'noopener';
    if (fileName) {
      link.download = fileName;
    }
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  //FILTER SUMMARY
  private buildFilterSummary(filters: TransactionLogFilterParams): string {
    const parts: string[] = [];
    if (filters.transactionCode) {
      parts.push(`Mã GD: ${filters.transactionCode}`);
    }
    if (filters.accountNo) {
      parts.push(`STK: ${filters.accountNo}`);
    }
    if (filters.status) {
      parts.push(`Trạng thái: ${filters.status}`);
    }
    if (filters.minAmount != null) {
      parts.push(`Từ tiền: ${new Intl.NumberFormat('vi-VN').format(filters.minAmount)}`);
    }
    if (filters.maxAmount != null) {
      parts.push(`Đến tiền: ${new Intl.NumberFormat('vi-VN').format(filters.maxAmount)}`);
    }
    if (filters.fromDate) {
      parts.push(`Từ ngày: ${filters.fromDate}`);
    }
    if (filters.toDate) {
      parts.push(`Đến ngày: ${filters.toDate}`);
    }
    if (parts.length === 0) {
      return 'Toàn bộ dữ liệu';
    }
    return parts.join(' • ');
  }

  //DATE FORMAT
  private formatDateTime(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('vi-VN');
  }

  //HTTP ERROR
  private getHttpErrorMessage(error: any, fallback: string): string {
    return error?.error?.message || error?.error?.error || error?.message || fallback;
  }
}
