import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  IDatasource,
  IGetRowsParams,
  ValueFormatterParams,
} from 'ag-grid-community';
import { PageResponse, TransactionLogFilterParams, TransactionLogRow } from '../../../models/transaction-log.model';
import { TransactionLogService } from '../../../services/transaction-log.service';
import { ExportFileItem, ExportProgressState } from '../../../models/export.model';
import { ToastNotification } from '../../../models/export.model';

@Component({
  selector: 'ph-transaction-log-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular, TuiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-log-table.component.html',
  styleUrl: './transaction-log-table.component.scss',
})
export class TransactionLogTableComponent implements OnChanges {
  private readonly transactionLogService = inject(TransactionLogService);
  @Input({ required: true }) filters!: TransactionLogFilterParams;
  @Input() exporting = false;
  @Input() downloading = false;
  @Input() progress: ExportProgressState | null = null;
  @Input() readyFilesCount = 0;
  @Input() toast: ToastNotification | null = null;

  @Output() readonly totalElementsChange = new EventEmitter<number>();
  @Output() readonly exportExcel = new EventEmitter<void>();
  @Output() readonly toggleFilesDrawer = new EventEmitter<void>();
  @Output() readonly dismissProgress = new EventEmitter<void>();
  @Output() readonly closeToast = new EventEmitter<void>();

  private gridApi: GridApi<TransactionLogRow> | null = null;
  readonly loading = { value: false };
  totalElements = 0;

  onGridReady(event: GridReadyEvent<TransactionLogRow>): void {
    this.gridApi = event.api;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters'] && !changes['filters'].firstChange && this.gridApi) {
      this.gridApi.paginationGoToFirstPage();

      this.gridApi.purgeInfiniteCache();
    }
  }

  private statusCellRenderer(params: ICellRendererParams<TransactionLogRow>): string {
    if (params.value === 'SUCCESS') {
      return `
        <span class="status-badge status-badge--success">
          <span class="dot"></span>SUCCESS
        </span>`;
    }
    if (params.value === 'FAILED') {
      return `
        <span class="status-badge status-badge--danger">
          <span class="dot"></span>FAILED
        </span>`;
    }
    return '';
  }

  readonly columnDefs: ColDef<TransactionLogRow>[] = [
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
    {
      headerName: 'ACCOUNT_NO',
      field: 'accountNo',
      minWidth: 180,
      flex: 1,
      cellStyle: {
        fontFamily: 'Consolas, monospace',
      },
    },
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
    {
      headerName: 'STATUS',
      field: 'status',
      minWidth: 170,
      flex: 1,
      cellRenderer: (params: ICellRendererParams<TransactionLogRow>) => this.statusCellRenderer(params),
    },
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

  readonly defaultColDef: ColDef<TransactionLogRow> = {
    sortable: false,
    resizable: true,
    suppressMovable: false,
  };

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
      this.loading.value = true;
      this.transactionLogService
        .search(this.filters, page, size)
        .pipe(
          finalize(() => {
            this.loading.value = false;
          }),
        )
        .subscribe({
          next: (response: PageResponse<TransactionLogRow>) => {
            const rows = response.content ?? [];
            const total = response.totalElements ?? 0;
            this.totalElements = total;
            this.totalElementsChange.emit(total);
            params.successCallback(rows, total);
          },
          error: (error) => {
            console.error('[TRANSACTION LOG] API ERROR', error);
            params.failCallback();
          },
        });
    },
  };
}
