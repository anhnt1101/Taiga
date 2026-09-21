import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  NgZone,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TuiButton, TuiCalendar, TuiDropdown, TuiInput, TuiTextfield } from '@taiga-ui/core';

import { TuiChevron, TuiDataListWrapper, TuiInputDate, TuiSelect } from '@taiga-ui/kit';

import { TuiDay } from '@taiga-ui/cdk';

import { AgGridAngular } from 'ag-grid-angular';

import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
  ValueFormatterParams,
} from 'ag-grid-community';

import { concatMap, finalize, from, tap } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Client, IMessage } from '@stomp/stompjs';

import {
  TransactionLogFilterParams,
  TransactionLogRow,
  TransactionStatus,
} from '../../../models/transaction-log.model';

import { TransactionLogService } from '../../../services/transaction-log.service';

import { ExportService } from '../../../services/export.service';

import { ExportRequestResponse } from '../../../models/export.model';

import { TransactionStatusCellComponent } from './transaction-status-cell.component';
import { AuthService } from '../../../services/auth.service';
/* =========================================================
   TOAST
========================================================= */

type ToastAction = 'export' | 'error';

interface ToastNotification {
  show: boolean;
  action: ToastAction;
  message?: string;
}

/* =========================================================
   WEBSOCKET EVENT
========================================================= */

interface ExportNotification {
  requestId: number;

  userId: number;

  exportStatus: 'NEW' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

  progress: number;

  fileName: string | null;

  message: string | null;
}

/* =========================================================
   INLINE PROGRESS
========================================================= */

interface ExportProgressState {
  requestId: number | null;

  isExporting: boolean;

  isComplete: boolean;

  progressPercent: number;

  currentStepMessage: string;

  processedRecords: number;

  exportedFile: ExportFileItem | null;
}

/* =========================================================
   EXPORT FILE MANAGER
========================================================= */

type ExportFileStatus = 'ready' | 'downloaded';

type ExportFileTab = 'ready' | 'downloaded' | 'all';

interface ExportFileItem {
  id: number;

  fileName: string;

  status: ExportFileStatus;

  createdAt: string;

  downloadedAt: string | null;

  downloadCount: number;

  /*
   * Backend hiện chưa trả recordCount
   * trong ExportRequestResponse.
   *
   * Export tạo trong phiên hiện tại sẽ
   * lấy từ totalElements().
   *
   * Export lịch sử chưa biết thì hiển thị "—".
   */
  recordCount: number | string;

  /*
   * Backend hiện chưa trả fileSize.
   */
  fileSize: string;

  filterSummary: string;

  raw: ExportRequestResponse;
}

@Component({
  selector: 'ph-transaction-log',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    TuiButton,
    TuiCalendar,
    TuiDropdown,
    TuiInput,
    TuiTextfield,

    TuiChevron,
    TuiDataListWrapper,
    TuiInputDate,
    TuiSelect,

    AgGridAngular,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './transaction-log.component.html',

  styleUrl: './transaction-log.component.scss',
})
export class TransactionLogComponent implements OnInit, OnDestroy {
  /* ========================================================
     SERVICE
  ======================================================== */

  private readonly transactionLogService = inject(TransactionLogService);

  private readonly exportService = inject(ExportService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly ngZone = inject(NgZone);

  /* ========================================================
     GRID
  ======================================================== */

  private gridApi: GridApi<TransactionLogRow> | null = null;

  /* ========================================================
     BASIC STATE
  ======================================================== */

  readonly totalElements = signal<number>(0);

  readonly loading = signal<boolean>(false);

  readonly exporting = signal<boolean>(false);

  readonly downloading = signal<boolean>(false);

  readonly currentExport = signal<ExportRequestResponse | null>(null);

  /* ========================================================
     TOAST
  ======================================================== */

  readonly toastNotification = signal<ToastNotification | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  /* ========================================================
     EXPORT PROGRESS
  ======================================================== */

  readonly exportProgress = signal<ExportProgressState | null>(null);

  /*
   * Ghi lại số record của request
   * được tạo trong phiên hiện tại.
   *
   * requestId -> total rows
   */
  private readonly exportRecordCounts = new Map<number, number>();

  /*
   * requestId -> mô tả filter.
   */
  private readonly exportFilterSummaries = new Map<number, string>();

  /* ========================================================
     EXPORT FILE LIST
  ======================================================== */

  readonly exportFiles = signal<ExportFileItem[]>([]);

  readonly exportDrawerOpen = signal<boolean>(false);

  readonly exportFileActiveTab = signal<ExportFileTab>('ready');

  readonly exportFileSearchKeyword = signal<string>('');

  /*
   * Chỉ xóa khỏi UI trong phiên hiện tại.
   *
   * Không xóa DB / MinIO.
   */
  private readonly hiddenExportFileIds = signal<Set<number>>(new Set<number>());

  readonly readyExportFiles = computed(() => this.exportFiles().filter((file) => file.status === 'ready'));

  readonly downloadedExportFiles = computed(() => this.exportFiles().filter((file) => file.status === 'downloaded'));

  readonly readyExportFilesCount = computed(() => this.readyExportFiles().length);

  readonly downloadedExportFilesCount = computed(() => this.downloadedExportFiles().length);

  readonly allExportFilesCount = computed(() => this.exportFiles().length);
  private readonly authService = inject(AuthService);
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

  /*
   * Facade để HTML hiện tại dùng:
   *
   * exportManager.currentProgress()
   * exportManager.readyFiles()
   * exportManager.isDrawerOpen()
   * exportManager.toggleDrawer()
   * exportManager.dismissProgressModal()
   */
  readonly exportManager = {
    currentProgress: this.exportProgress,

    readyFiles: this.readyExportFiles,

    isDrawerOpen: this.exportDrawerOpen,

    toggleDrawer: (open?: boolean): void => {
      if (typeof open === 'boolean') {
        this.exportDrawerOpen.set(open);
      } else {
        this.exportDrawerOpen.update((value) => !value);
      }

      /*
       * Mỗi lần mở drawer
       * load lại dữ liệu thật từ DB.
       */
      if (this.exportDrawerOpen()) {
        this.loadExportFiles();
      }
    },

    dismissProgressModal: (): void => {
      this.exportProgress.set(null);
    },
  };

  /* ========================================================
     WEBSOCKET
  ======================================================== */

  private stompClient: Client | null = null;

  readonly websocketConnected = signal<boolean>(false);

  /* ========================================================
     STATUS
  ======================================================== */

  readonly statusItems: Array<TransactionStatus | ''> = ['', 'SUCCESS', 'FAILED'];

  readonly stringifyStatus = (value: TransactionStatus | ''): string => {
    const labels: Record<string, string> = {
      '': 'Tất cả trạng thái',

      SUCCESS: 'SUCCESS',

      FAILED: 'FAILED',
    };

    return labels[value] ?? value;
  };

  /* ========================================================
     FILTER
  ======================================================== */

  readonly filters: TransactionLogFilterParams = {
    transactionCode: '',

    accountNo: '',

    status: '',

    minAmount: null,

    maxAmount: null,

    fromDate: '',

    toDate: '',
  };

  /* ========================================================
     DATE
  ======================================================== */

  fromDateValue: TuiDay | null = null;

  toDateValue: TuiDay | null = null;

  /* ========================================================
     COLUMN DEFINITIONS
  ======================================================== */

  readonly columnDefs: ColDef<TransactionLogRow>[] = [
    /*
     * STT
     */
    {
      headerName: 'STT',

      colId: 'stt',

      valueGetter: (params) => {
        const rowIndex = params.node?.rowIndex;

        return rowIndex != null ? rowIndex + 1 : '';
      },

      width: 75,

      pinned: 'left',

      sortable: false,

      resizable: false,

      suppressMovable: true,

      lockPosition: 'left',
    },

    /*
     * TRANSACTION_CODE
     */
    {
      headerName: 'TRANSACTION_CODE',

      field: 'transactionCode',

      minWidth: 210,

      flex: 1,

      cellStyle: {
        fontFamily: 'Consolas, monospace',

        fontWeight: '600',

        color: '#0e6e5a',
      },
    },

    /*
     * ACCOUNT_NO
     */
    {
      headerName: 'ACCOUNT_NO',

      field: 'accountNo',

      minWidth: 180,

      flex: 1,

      cellStyle: {
        fontFamily: 'Consolas, monospace',
      },
    },

    /*
     * AMOUNT
     */
    {
      headerName: 'AMOUNT',

      field: 'amount',

      minWidth: 180,

      flex: 1,

      cellStyle: {
        fontWeight: '700',

        textAlign: 'right',
      },

      valueFormatter: (params: ValueFormatterParams<TransactionLogRow, number>) => {
        if (params.value === null || params.value === undefined) {
          return '';
        }

        return new Intl.NumberFormat('vi-VN').format(params.value) + ' VND';
      },
    },

    /*
     * STATUS
     */
    {
      headerName: 'STATUS',

      field: 'status',

      minWidth: 170,

      flex: 1,

      cellRenderer: TransactionStatusCellComponent,
    },

    /*
     * CREATED_AT
     */
    {
      headerName: 'CREATED_AT',

      field: 'createdAt',

      minWidth: 200,

      flex: 1,

      cellStyle: {
        fontFamily: 'Consolas, monospace',

        color: '#475569',
      },
    },
  ];

  /* ========================================================
     DEFAULT COLUMN
  ======================================================== */

  readonly defaultColDef: ColDef<TransactionLogRow> = {
    sortable: false,

    resizable: true,

    suppressMovable: false,
  };

  /* ========================================================
     GRID OPTIONS
  ======================================================== */

  readonly gridOptions: GridOptions<TransactionLogRow> = {
    rowModelType: 'infinite',

    pagination: true,

    paginationPageSize: 100,

    paginationPageSizeSelector: [100, 200, 500, 1000],

    cacheBlockSize: 100,

    maxBlocksInCache: 10,

    maxConcurrentDatasourceRequests: 1,

    blockLoadDebounceMillis: 50,

    suppressCellFocus: true,
  };

  /* ========================================================
     DATASOURCE
  ======================================================== */

  readonly datasource: IDatasource = {
    getRows: (params: IGetRowsParams): void => {
      const startRow = params.startRow;

      const endRow = params.endRow;

      const size = endRow - startRow;

      if (size <= 0) {
        console.error('AG Grid size không hợp lệ:', size);

        params.failCallback();

        return;
      }

      const page = Math.floor(startRow / size);

      console.log('[TRANSACTION LOG] GET ROWS', {
        startRow,
        endRow,
        page,
        size,
      });

      console.log('[TRANSACTION LOG] FILTER', this.filters);

      this.loading.set(true);

      this.transactionLogService
        .search(this.filters, page, size)
        .pipe(
          finalize(() => {
            this.loading.set(false);
          }),
        )
        .subscribe({
          next: (response) => {
            const rows = response.content ?? [];

            const total = response.totalElements ?? 0;

            this.totalElements.set(total);

            params.successCallback(rows, total);
          },

          error: (error) => {
            console.error('[TRANSACTION LOG] API ERROR', error);

            params.failCallback();
          },
        });
    },
  };

  /* ========================================================
     INIT
  ======================================================== */

  ngOnInit(): void {
    /*
     * Load danh sách file export cũ.
     */
    this.loadExportFiles();

    /*
     * Kết nối WebSocket ngay khi
     * mở màn Transaction Log.
     */
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.closeToast();

    if (this.stompClient) {
      void this.stompClient.deactivate();
    }
  }

  /* ========================================================
     GRID READY
  ======================================================== */

  onGridReady(event: GridReadyEvent<TransactionLogRow>): void {
    this.gridApi = event.api;
  }

  /* ========================================================
     DATE
  ======================================================== */

  onFromDateChange(value: TuiDay | null): void {
    this.fromDateValue = value;

    this.filters.fromDate = this.formatTuiDay(value);
  }

  onToDateChange(value: TuiDay | null): void {
    this.toDateValue = value;

    this.filters.toDate = this.formatTuiDay(value);
  }

  private formatTuiDay(value: TuiDay | null): string {
    if (!value) {
      return '';
    }

    const year = String(value.year);

    const month = String(value.month + 1).padStart(2, '0');

    const day = String(value.day).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /* ========================================================
     VALIDATE
  ======================================================== */

  private validateFilters(): boolean {
    if (
      this.filters.minAmount != null &&
      this.filters.maxAmount != null &&
      this.filters.minAmount > this.filters.maxAmount
    ) {
      this.showToast('error', 'Số tiền tối thiểu không được lớn hơn số tiền tối đa');

      return false;
    }

    if (this.filters.minAmount != null && this.filters.minAmount < 0) {
      this.showToast('error', 'Số tiền tối thiểu không được nhỏ hơn 0');

      return false;
    }

    if (this.filters.maxAmount != null && this.filters.maxAmount < 0) {
      this.showToast('error', 'Số tiền tối đa không được nhỏ hơn 0');

      return false;
    }

    if (this.filters.fromDate && this.filters.toDate && this.filters.fromDate > this.filters.toDate) {
      this.showToast('error', 'Từ ngày không được lớn hơn đến ngày');

      return false;
    }

    return true;
  }

  /* ========================================================
     SEARCH
  ======================================================== */

  onSearch(): void {
    if (!this.validateFilters()) {
      return;
    }

    if (!this.gridApi) {
      console.warn('Grid chưa khởi tạo');

      return;
    }

    this.gridApi.paginationGoToFirstPage();

    this.gridApi.purgeInfiniteCache();
  }

  /* ========================================================
     CLEAR FILTER
  ======================================================== */

  onClearFilters(): void {
    this.filters.transactionCode = '';

    this.filters.accountNo = '';

    this.filters.status = '';

    this.filters.minAmount = null;

    this.filters.maxAmount = null;

    this.filters.fromDate = '';

    this.filters.toDate = '';

    this.fromDateValue = null;

    this.toDateValue = null;

    if (!this.gridApi) {
      return;
    }

    this.gridApi.paginationGoToFirstPage();

    this.gridApi.purgeInfiniteCache();
  }

  /* ========================================================
     TOAST
  ======================================================== */

  private showToast(
    action: ToastAction,

    message?: string,
  ): void {
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

  /* ========================================================
     EXPORT EXCEL
  ======================================================== */

  onExportExcel(): void {
    if (this.exporting() || this.downloading()) {
      return;
    }

    if (!this.validateFilters()) {
      return;
    }

    /*
     * Copy filter.
     *
     * Không gửi page / size.
     */
    const exportParams: TransactionLogFilterParams = {
      transactionCode: this.filters.transactionCode?.trim() || '',

      accountNo: this.filters.accountNo?.trim() || '',

      status: this.filters.status || '',

      minAmount: this.filters.minAmount,

      maxAmount: this.filters.maxAmount,

      fromDate: this.filters.fromDate || '',

      toDate: this.filters.toDate || '',
    };

    /*
     * Snapshot số record.
     *
     * Dùng để hiển thị:
     *
     * "Xuất xong 100.000 bản ghi"
     */
    const recordCount = this.totalElements();

    this.currentExport.set(null);

    this.exporting.set(true);

    /*
     * Hiển thị progress ngay,
     * kể cả Kafka chưa nhận.
     */
    this.exportProgress.set({
      requestId: null,

      isExporting: true,

      isComplete: false,

      progressPercent: 0,

      currentStepMessage: 'Đang tạo yêu cầu xuất Excel...',

      processedRecords: 0,

      exportedFile: null,
    });

    console.log('[TRANSACTION LOG] CREATE EXPORT', exportParams);

    this.exportService
      .createTransactionLogExport(exportParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('[TRANSACTION LOG] EXPORT CREATED', response);

          this.currentExport.set(response);

          /*
           * Ghi metadata cho file
           * của phiên hiện tại.
           */
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

          /*
           * KHÔNG pollUntilDone() nữa.
           *
           * Từ đây WebSocket sẽ cập nhật.
           */
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] CREATE EXPORT ERROR', error);

          this.exporting.set(false);

          this.exportProgress.set(null);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tạo yêu cầu xuất Excel'));
        },
      });
  }

  /* ========================================================
     WEBSOCKET
  ======================================================== */

  private connectWebSocket(): void {
    if (this.stompClient) {
      return;
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',

      reconnectDelay: 5000,

      heartbeatIncoming: 10000,

      heartbeatOutgoing: 10000,

      debug: (message: string) => {
        console.debug('[STOMP]', message);
      },

      onConnect: () => {
        this.ngZone.run(() => {
          console.log('[WEBSOCKET] CONNECTED');

          this.websocketConnected.set(true);
        });

        client.subscribe(
          '/user/queue/exports',

          (message: IMessage) => {
            this.ngZone.run(() => {
              this.handleExportWebSocketMessage(message);
            });
          },
        );

        this.loadExportFiles();
      },

      onDisconnect: () => {
        this.ngZone.run(() => {
          this.websocketConnected.set(false);
        });
      },

      onWebSocketClose: (event) => {
        this.ngZone.run(() => {
          this.websocketConnected.set(false);
        });

        console.warn('[WEBSOCKET] CLOSED', event.code, event.reason);
      },

      onWebSocketError: (error) => {
        console.error('[WEBSOCKET] ERROR', error);
      },

      onStompError: (frame) => {
        console.error('[WEBSOCKET] STOMP ERROR', {
          command: frame.command,

          headers: frame.headers,

          body: frame.body,
        });
      },
    });

    /*
     * Rất quan trọng:
     *
     * Mỗi lần connect/reconnect
     * đều lấy JWT mới nhất từ AuthService.
     */
    client.beforeConnect = async () => {
      const token = this.authService.getToken();

      if (!token) {
        console.error('[WEBSOCKET] Không có JWT token');

        throw new Error('Không có JWT token để kết nối WebSocket');
      }

      client.connectHeaders = {
        Authorization: `Bearer ${token}`,
      };

      console.log('[WEBSOCKET] CONNECT STOMP với JWT');
    };

    this.stompClient = client;

    client.activate();
  }

  private handleExportWebSocketMessage(message: IMessage): void {
    let notification: ExportNotification;

    try {
      notification = JSON.parse(message.body) as ExportNotification;
    } catch (error) {
      console.error('[WEBSOCKET] JSON không hợp lệ', message.body, error);

      return;
    }

    console.log('[WEBSOCKET] EXPORT EVENT', notification);

    /*
     * Nếu đây là event PROCESSING.
     */
    if (notification.exportStatus === 'PROCESSING') {
      this.handleProcessingEvent(notification);

      return;
    }

    /*
     * Export COMPLETED.
     */
    if (notification.exportStatus === 'COMPLETED') {
      this.handleCompletedEvent(notification);

      return;
    }

    /*
     * Export ERROR.
     */
    if (notification.exportStatus === 'ERROR') {
      this.handleErrorEvent(notification);
    }
  }

  private handleProcessingEvent(notification: ExportNotification): void {
    const current = this.currentExport();

    /*
     * Progress của request cũ / request khác
     * không làm thay đổi thanh progress hiện tại.
     */
    if (!current || current.id !== notification.requestId) {
      return;
    }

    const progress = this.clampProgress(notification.progress);

    const totalRecords = this.exportRecordCounts.get(notification.requestId) ?? 0;

    const processedRecords = totalRecords > 0 ? Math.round((totalRecords * progress) / 100) : 0;

    this.exporting.set(true);

    this.exportProgress.set({
      requestId: notification.requestId,

      isExporting: true,

      isComplete: false,

      progressPercent: progress,

      currentStepMessage: notification.message || `Đang xuất ${progress}%`,

      processedRecords,

      exportedFile: null,
    });
  }

  private handleCompletedEvent(notification: ExportNotification): void {
    /*
     * Luôn reload list vì có thể
     * đây là export chạy từ tab/session khác.
     */
    this.loadExportFiles();

    const current = this.currentExport();

    /*
     * Event không phải request
     * đang hiển thị inline.
     */
    if (!current || current.id !== notification.requestId) {
      this.showToast(
        'export',
        notification.fileName ? `File ${notification.fileName} đã sẵn sàng` : 'Một file Excel đã xuất xong',
      );

      return;
    }

    this.exporting.set(false);

    /*
     * GET một lần sau COMPLETED
     * để lấy DTO đầy đủ.
     *
     * Đây KHÔNG phải polling.
     */
    this.exportService
      .getStatus(notification.requestId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.currentExport.set(response);

          const file = this.toExportFile(response);

          const totalRecords = this.exportRecordCounts.get(response.id) ?? 0;

          this.exportProgress.set({
            requestId: response.id,

            isExporting: false,

            isComplete: true,

            progressPercent: 100,

            currentStepMessage: notification.message || 'File Excel đã sẵn sàng',

            processedRecords: totalRecords,

            exportedFile: file,
          });

          this.showToast(
            'export',
            response.fileName
              ? `File ${response.fileName} đã được tạo thành công`
              : 'File Excel đã được tạo thành công',
          );

          this.loadExportFiles();
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] GET COMPLETED EXPORT ERROR', error);

          /*
           * Event WebSocket đã xác nhận COMPLETED,
           * nên vẫn hiển thị hoàn tất dù GET status lỗi.
           */
          this.exportProgress.update((currentProgress) => {
            if (!currentProgress) {
              return currentProgress;
            }

            return {
              ...currentProgress,

              isExporting: false,

              isComplete: true,

              progressPercent: 100,

              currentStepMessage: notification.message || 'File Excel đã sẵn sàng',
            };
          });
        },
      });
  }

  private handleErrorEvent(notification: ExportNotification): void {
    this.loadExportFiles();

    const current = this.currentExport();

    if (current && current.id === notification.requestId) {
      this.exporting.set(false);

      this.exportProgress.set({
        requestId: notification.requestId,

        isExporting: false,

        isComplete: false,

        progressPercent: this.exportProgress()?.progressPercent ?? 0,

        currentStepMessage: notification.message || 'Xuất Excel thất bại',

        processedRecords: this.exportProgress()?.processedRecords ?? 0,

        exportedFile: null,
      });
    }

    this.showToast('error', notification.message || 'Xuất Excel thất bại');
  }

  /*
   * JWT của project thường đang được
   * interceptor đọc từ localStorage.
   *
   * Nếu project của bạn dùng đúng
   * "accessToken" thì nhánh đầu tiên chạy.
   *
   * Có thêm fallback "token".
   */
  private getAccessToken(): string | null {
    return this.authService.getToken();
  }

  private clampProgress(progress: number | null | undefined): number {
    const value = Number(progress ?? 0);

    if (Number.isNaN(value)) {
      return 0;
    }

    return Math.max(0, Math.min(100, Math.round(value)));
  }

  /* ========================================================
     EXPORT FILE LIST
  ======================================================== */

  private loadExportFiles(): void {
    this.exportService
      .getMyRequests()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const hiddenIds = this.hiddenExportFileIds();

          const files = (response ?? [])

            /*
             * Drawer chỉ hiển thị
             * file đã tạo xong.
             */
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

  /* ========================================================
     DOWNLOAD
  ======================================================== */

  downloadExport(): void {
    const current = this.currentExport();

    if (!current) {
      return;
    }

    if (current.exportStatus !== 'COMPLETED') {
      this.showToast('error', 'File export chưa sẵn sàng');

      return;
    }

    const file = this.toExportFile(current);

    this.onDownloadExportFile(file);
  }

  onDownloadNow(file: ExportFileItem): void {
    this.onDownloadExportFile(file);
  }

  onDownloadExportFile(file: ExportFileItem): void {
    if (this.downloading()) {
      return;
    }

    this.downloading.set(true);

    this.exportService
      .getDownloadUrl(file.id)
      .pipe(
        finalize(() => {
          this.downloading.set(false);
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.triggerBrowserDownload(response.url, file.fileName);

          /*
           * Backend hiện tại của bạn
           * đang cập nhật download status
           * khi xin URL.
           *
           * Load lại list để READY -> DOWNLOADED.
           */
          this.loadExportFiles();
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] DOWNLOAD ERROR', error);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tải file Excel'));
        },
      });
  }

  onDownloadAllReadyFiles(): void {
    const files = this.readyExportFiles();

    if (files.length === 0 || this.downloading()) {
      return;
    }

    this.downloading.set(true);

    /*
     * Xin URL lần lượt,
     * tránh bắn hàng loạt request cùng lúc.
     */
    from(files)
      .pipe(
        concatMap((file) =>
          this.exportService.getDownloadUrl(file.id).pipe(
            tap((response) => {
              this.triggerBrowserDownload(response.url, file.fileName);
            }),
          ),
        ),

        finalize(() => {
          this.downloading.set(false);

          this.loadExportFiles();
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: (error) => {
          console.error('[EXPORT FILES] DOWNLOAD ALL ERROR', error);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tải tất cả file'));
        },
      });
  }

  private triggerBrowserDownload(
    url: string,

    fileName?: string | null,
  ): void {
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

  /* ========================================================
     FILTER SUMMARY
  ======================================================== */

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

  /* ========================================================
     DATE FORMAT
  ======================================================== */

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

  /* ========================================================
     HTTP ERROR
  ======================================================== */

  private getHttpErrorMessage(
    error: any,

    fallback: string,
  ): string {
    return error?.error?.message || error?.error?.error || error?.message || fallback;
  }
}
