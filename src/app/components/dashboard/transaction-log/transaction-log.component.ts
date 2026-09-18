import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';

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

import { finalize } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  TransactionLogFilterParams,
  TransactionLogRow,
  TransactionStatus,
} from '../../../models/transaction-log.model';

import { TransactionLogService } from '../../../services/transaction-log.service';

import { ExportService } from '../../../services/export.service';

import { ExportRequestResponse } from '../../../models/export.model';

import { TransactionStatusCellComponent } from './transaction-status-cell.component';

type ToastAction = 'export' | 'error';

interface ToastNotification {
  show: boolean;
  action: ToastAction;
  message?: string;
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
export class TransactionLogComponent {
  /*
   * ==========================================
   * SERVICE
   * ==========================================
   */

  private readonly transactionLogService = inject(TransactionLogService);

  private readonly exportService = inject(ExportService);

  private readonly destroyRef = inject(DestroyRef);

  /*
   * ==========================================
   * GRID
   * ==========================================
   */

  private gridApi: GridApi<TransactionLogRow> | null = null;

  /*
   * ==========================================
   * STATE
   * ==========================================
   */

  readonly totalElements = signal<number>(0);

  readonly loading = signal<boolean>(false);

  /*
   * ==========================================
   * EXPORT STATE
   * ==========================================
   */
  readonly checkingPendingDownload = signal<boolean>(false);

  readonly exporting = signal<boolean>(false);

  readonly downloading = signal<boolean>(false);

  readonly currentExport = signal<ExportRequestResponse | null>(null);

  readonly toastNotification = signal<ToastNotification | null>(null);

  private toastTimer: ReturnType<typeof setTimeout> | null = null;
  private exportStartTime = 0;
  private exportCreatedTime = 0;
  /*
   * ==========================================
   * STATUS
   * ==========================================
   */

  readonly statusItems: Array<TransactionStatus | ''> = ['', 'SUCCESS', 'FAILED'];

  readonly stringifyStatus = (value: TransactionStatus | ''): string => {
    const labels: Record<string, string> = {
      '': 'Tất cả trạng thái',

      SUCCESS: 'SUCCESS',

      FAILED: 'FAILED',
    };

    return labels[value] ?? value;
  };

  /*
   * ==========================================
   * FILTER
   * ==========================================
   */

  readonly filters: TransactionLogFilterParams = {
    transactionCode: '',

    accountNo: '',

    status: '',

    minAmount: null,

    maxAmount: null,

    fromDate: '',

    toDate: '',
  };

  /*
   * ==========================================
   * DATE
   * ==========================================
   */

  fromDateValue: TuiDay | null = null;

  toDateValue: TuiDay | null = null;

  /*
   * ==========================================
   * COLUMN DEFINITIONS
   * ==========================================
   */

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

  /*
   * ==========================================
   * DEFAULT COLUMN
   * ==========================================
   */

  readonly defaultColDef: ColDef<TransactionLogRow> = {
    sortable: false,

    resizable: true,

    suppressMovable: false,
  };

  /*
   * ==========================================
   * GRID OPTIONS
   * ==========================================
   */

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

  /*
   * ==========================================
   * DATASOURCE
   * ==========================================
   */

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

      console.log('===================================');

      console.log('[TRANSACTION LOG] GET ROWS');

      console.log({
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
            console.log('[TRANSACTION LOG] API RESPONSE', response);

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

  /*
   * ==========================================
   * GRID READY
   * ==========================================
   */

  onGridReady(event: GridReadyEvent<TransactionLogRow>): void {
    console.log('[TRANSACTION LOG] GRID READY');

    this.gridApi = event.api;
  }

  /*
   * ==========================================
   * FROM DATE
   * ==========================================
   */

  onFromDateChange(value: TuiDay | null): void {
    this.fromDateValue = value;

    this.filters.fromDate = this.formatTuiDay(value);
  }

  /*
   * ==========================================
   * TO DATE
   * ==========================================
   */

  onToDateChange(value: TuiDay | null): void {
    this.toDateValue = value;

    this.filters.toDate = this.formatTuiDay(value);
  }

  /*
   * ==========================================
   * FORMAT DATE
   * ==========================================
   */

  private formatTuiDay(value: TuiDay | null): string {
    if (!value) {
      return '';
    }

    const year = String(value.year);

    const month = String(value.month + 1).padStart(2, '0');

    const day = String(value.day).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /*
   * ==========================================
   * VALIDATE FILTER
   * ==========================================
   */

  private validateFilters(): boolean {
    /*
     * MIN > MAX
     */
    if (
      this.filters.minAmount != null &&
      this.filters.maxAmount != null &&
      this.filters.minAmount > this.filters.maxAmount
    ) {
      this.showToast('error', 'Số tiền tối thiểu không được lớn hơn số tiền tối đa');

      return false;
    }

    /*
     * MIN < 0
     */
    if (this.filters.minAmount != null && this.filters.minAmount < 0) {
      this.showToast('error', 'Số tiền tối thiểu không được nhỏ hơn 0');

      return false;
    }

    /*
     * MAX < 0
     */
    if (this.filters.maxAmount != null && this.filters.maxAmount < 0) {
      this.showToast('error', 'Số tiền tối đa không được nhỏ hơn 0');

      return false;
    }

    /*
     * FROM DATE > TO DATE
     */
    if (this.filters.fromDate && this.filters.toDate && this.filters.fromDate > this.filters.toDate) {
      this.showToast('error', 'Từ ngày không được lớn hơn đến ngày');

      return false;
    }

    return true;
  }

  /*
   * ==========================================
   * SEARCH
   * ==========================================
   */

  onSearch(): void {
    if (!this.validateFilters()) {
      return;
    }

    if (!this.gridApi) {
      console.warn('Grid chưa khởi tạo');

      return;
    }

    console.log('[TRANSACTION LOG] SEARCH');

    /*
     * Search mới
     * => về page đầu.
     */
    this.gridApi.paginationGoToFirstPage();

    /*
     * Xóa cache.
     *
     * Grid tự gọi lại getRows().
     */
    this.gridApi.purgeInfiniteCache();
  }

  /*
   * ==========================================
   * CLEAR FILTER
   * ==========================================
   */

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

  // thong bao
  private showToast(action: ToastAction, message?: string): void {
    /*
     * Nếu đang có timer cũ
     * thì hủy trước.
     */
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastNotification.set({
      show: true,
      action,
      message,
    });

    /*
     * Tự đóng sau 5 giây.
     */
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

  /*
   * ==========================================
   * EXPORT EXCEL
   * ==========================================
   *
   * Không export page hiện tại.
   *
   * Gửi filter hiện tại cho backend.
   *
   * Backend export TOÀN BỘ record
   * thỏa filter.
   * ==========================================
   */

  onExportExcel(): void {
    if (this.exporting() || this.downloading()) {
      return;
    }

    if (!this.validateFilters()) {
      return;
    }

    this.currentExport.set(null);

    this.exporting.set(true);

    this.exportStartTime = performance.now();

    /*
     * Copy riêng filter.
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

    console.log('[TRANSACTION LOG] CREATE EXPORT', exportParams);

    this.exportService
      .createTransactionLogExport(exportParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('[TRANSACTION LOG] EXPORT CREATED', response);

          this.currentExport.set(response);

          /*
           * NEW đã được tạo trong DB.
           *
           * Bắt đầu polling.
           */
          this.pollExport(response.id);
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] CREATE EXPORT ERROR', error);

          this.exporting.set(false);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tạo yêu cầu xuất Excel'));
        },
      });
  }

  /*
   * ==========================================
   * POLL EXPORT
   * ==========================================
   */

  private pollExport(id: number): void {
    this.exportService
      .pollUntilDone(id, 5000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('[TRANSACTION LOG] EXPORT STATUS', response);

          this.currentExport.set(response);

          /*
           * ==================================
           * COMPLETED
           * ==================================
           */
          if (response.exportStatus === 'COMPLETED') {
            this.exporting.set(false);

            /*
             * Hiển thị Toast thành công.
             */
            this.showToast(
              'export',
              response.fileName
                ? `File ${response.fileName} đã được tạo thành công`
                : 'File Excel đã được tạo thành công',
            );

            /*
             * Sau đó tự tải.
             */

            this.downloadExport();

            return;
          }

          /*
           * ==================================
           * ERROR
           * ==================================
           */
          if (response.exportStatus === 'ERROR') {
            this.exporting.set(false);

            this.showToast('error', response.errorMessage || 'Xuất Excel thất bại');
          }
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] POLL EXPORT ERROR', error);

          this.exporting.set(false);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không kiểm tra được trạng thái xuất Excel'));
        },
      });
  }

  /*
   * ==========================================
   * DOWNLOAD EXPORT
   * ==========================================
   */

  downloadExport(): void {
    const current = this.currentExport();

    if (!current) {
      return;
    }

    if (current.exportStatus !== 'COMPLETED') {
      this.showToast('error', 'File export chưa sẵn sàng');

      return;
    }

    if (this.downloading()) {
      return;
    }

    const downloadStartTime = performance.now();

    this.downloading.set(true);

    this.exportService
      .getDownloadUrl(current.id)
      .pipe(
        finalize(() => {
          this.downloading.set(false);
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          console.log('[TRANSACTION LOG] DOWNLOAD URL', response);

          const link = document.createElement('a');

          link.href = response.url;

          link.rel = 'noopener';

          document.body.appendChild(link);

          link.click();

          link.remove();
          // ==========================
          // THỜI GIAN DOWNLOAD API
          // ==========================

          const downloadEndTime = performance.now();

          const downloadSeconds = (downloadEndTime - downloadStartTime) / 1000;

          console.log(`[TRANSACTION LOG] Download mất: ${downloadSeconds.toFixed(2)}s`);

          // ==========================
          // TỔNG THỜI GIAN
          // ==========================

          const totalSeconds = (downloadEndTime - this.exportStartTime) / 1000;

          console.log(`[TRANSACTION LOG] Tổng thời gian từ lúc tạo request đến download: ${totalSeconds.toFixed(2)}s`);
        },

        error: (error) => {
          console.error('[TRANSACTION LOG] DOWNLOAD ERROR', error);

          this.showToast('error', this.getHttpErrorMessage(error, 'Không thể tải file Excel'));
        },
      });
  }

  /*
   * ==========================================
   * HTTP ERROR MESSAGE
   * ==========================================
   */

  private getHttpErrorMessage(error: any, fallback: string): string {
    return error?.error?.message || error?.error?.error || error?.message || fallback;
  }
}
