import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions } from 'ag-grid-community';
import { DanhMucRow, ComponentCodeOption } from '../../../models/danh-muc.model';
import { StatusCellComponent } from './status-cell.component';
import { ActiveStatusCellComponent } from './active-status-cell.component';
import { ActionsCellComponent } from './actions-cell.component';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
function formatDateString(val: any): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'number') {
    const d = new Date(val > 10000000000 ? val : val * 1000);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
  const str = String(val).trim();
  if (!str) return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const parts = str.split('T')[0].split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }
  return str;
}

@Component({
  selector: 'ph-table',
  standalone: true,
  imports: [CommonModule, TuiButton, AgGridAngular],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="card table-card">
      <div class="table-card__toolbar">
        <h2>
          Danh sách bản ghi
          <span class="badge">{{ totalElements }}</span>
        </h2>
        <div class="table-card__actions">
          @if (selectionWarning()) {
            <span class="selection-warning">
              {{ selectionWarning() }}
            </span>
          }


          @if (selectedAction() === 'approve') {
            <button
              class="btn btn--primary btn--approve"
              tuiButton
              appearance="primary"
              type="button"
              (click)="onBatchApproveClick()">
              
              Duyệt ({{ selectedRows().length }})

            </button>
          }


          @if (selectedAction() === 'cancel') {
            <button
              class="btn btn--danger"
              tuiButton
              appearance="accent"
              type="button"
              (click)="onCancelApproveClick()">

              Hủy duyệt ({{ selectedRows().length }})

            </button>
          }
          <button class="btn btn--outline" tuiButton appearance="outline" type="button" (click)="onExportExcel()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Xuất Excel
          </button>
        </div>
      </div>

      <div class="table-card__grid">
        @if (loading) {
          <div class="table-loading-overlay">
            <div class="spinner"></div>
            <span>Đang tải dữ liệu...</span>
          </div>
        }
        <ag-grid-angular
          class="ph-grid ag-theme-quartz"
          [rowData]="rowData"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [gridOptions]="gridOptions"
          (gridReady)="onGridReady($event)"
        />
      </div>


      <div class="pagination">

       <div class="page-size">
          <span>Page Size:</span>

          <select
            [value]="pageSize"
            (change)="changePageSize($event)">

            @for (size of pageSizes; track size) {
              <option [value]="size">
                {{ size }}
              </option>
            }

          </select>
        </div>

        <!-- Về trang đầu -->
        <button
          tuiButton
          appearance="secondary"
          size="s"
          type="button"
          [disabled]="currentPage === 0"
          (click)="changePage(0)">
          <<
        </button>

        <!-- Lùi 1 trang -->
        <button
          tuiButton
          appearance="secondary"
          size="s"
          type="button"
          [disabled]="currentPage === 0"
          (click)="changePage(currentPage - 1)">
          <
        </button>


        <span class="page-info">
          Page {{ currentPage + 1 }} of {{ totalPages }}
        </span>


        <!-- Tiến 1 trang -->
        <button
          tuiButton
          appearance="secondary"
          size="s"
          type="button"
          [disabled]="currentPage >= totalPages - 1"
          (click)="changePage(currentPage + 1)">
          >
        </button>

        <!-- Đến trang cuối -->
        <button
          tuiButton
          appearance="secondary"
          size="s"
          type="button"
          [disabled]="currentPage >= totalPages - 1"
          (click)="changePage(totalPages - 1)">
          >>
        </button>

      </div>
    </section>
  `,
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() pageSize = 0;
  @Input() totalElements = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  private gridApi!: GridApi<DanhMucRow>;

  readonly pageSizes = [10, 20, 50, 100];

  selectionWarning = signal<string>('');
  selectedAction = signal<'approve' | 'cancel' | null>(null);
  @Output() cancelApproveEvent = new EventEmitter<DanhMucRow[]>();

  @Input({ required: true }) rowData: DanhMucRow[] = [];
  @Input() loading = false;
  readonly selectedRows = signal<DanhMucRow[]>([]);
  @Output() viewRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() copyRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() editRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() deleteRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() exportExcelEvent = new EventEmitter<void>();
  @Output() batchApproveEvent = new EventEmitter<DanhMucRow[]>();

  readonly columnDefs: ColDef<DanhMucRow>[] = [
    {
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 48,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
      sortable: false,
      resizable: false,
    },
    {
      headerName: 'STT',
      field: 'stt',
      width: 70,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },
    {
      headerName: 'Danh mục theo nhóm',
      field: 'paramType',
      minWidth: 180,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },
    {
      headerName: 'Giá trị thành phần',
      field: 'paramValue',
      width: 150,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },
    {
      headerName: 'Tên thành phần',
      field: 'paramName',
      width: 150,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },
    {
      headerName: 'Mô tả',
      field: 'description',
      width: 180,
    },
    {
      headerName: 'Cấu phần xử lý',
      field: 'componentCode',
      width: 150,
      valueGetter: (params) => {
        const val = params.data?.componentCode || (params.data as any)?.cauPhanXuLy;
        if (typeof val === 'object' && val !== null) {
          return (val as ComponentCodeOption).componentCode || '';
        }
        return val || '';
      },
      valueFormatter: (params) => {
        if (typeof params.value === 'object' && params.value !== null) {
          return params.value.componentCode || '';
        }
        return params.value || '';
      },
    },
    {
      headerName: 'Ngày hiệu lực',
      field: 'effectiveDate',
      width: 160,
      valueGetter: (params) => {
        const row = params.data;
        if (!row) return '';
        const raw =
          row.effectiveDate ??
          (row as any).ngayHieuLuc ??
          (row as any).effective_date ??
          (row as any).fromDate ??
          (row as any).startDate ??
          '';
        return formatDateString(raw);
      },
    },
    {
      headerName: 'Ngày hết hiệu lực',
      field: 'endEffectiveDate',
      width: 140,
      valueGetter: (params) => {
        const row = params.data;
        if (!row) return '';
        const raw =
          row.endEffectiveDate ??
          (row as any).ngayHetHieuLuc ??
          (row as any).end_effective_date ??
          (row as any).toDate ??
          (row as any).endDate ??
          '';
        return formatDateString(raw);
      },
    },
    {
      headerName: 'Trạng thái tham số',
      field: 'status',
      minWidth: 170,
      valueGetter: (params) => {
        const row = params.data;
        if (!row) return 1;
        const rawStatus = row.status ?? (row as any).trangThai;
        if (typeof rawStatus === 'number') return rawStatus;
        if (typeof rawStatus === 'string') {
          const parsed = parseInt(rawStatus, 10);
          if (!isNaN(parsed)) return parsed;
        }
        if (rawStatus && typeof rawStatus === 'object' && typeof (rawStatus as any).code === 'number') {
          return (rawStatus as any).code;
        }
        return 1;
      },
      cellRenderer: StatusCellComponent,
    },
    {
      headerName: 'Trạng thái hoạt động',
      field: 'isActive',
      minWidth: 160,
      valueGetter: (params) => {
        const row = params.data;
        if (!row) return 1;
        const rawActive = (row.isActive ?? (row as any).trangThaiHoatDong ?? (row as any).active) as any;
        if (
          rawActive === 'inactive' ||
          rawActive === 0 ||
          rawActive === '0' ||
          rawActive === false ||
          rawActive === 'Không hoạt động' ||
          rawActive === 'NGUNG_HOAT_DONG'
        ) {
          return 0;
        }
        return 1;
      },
      cellRenderer: ActiveStatusCellComponent,
    },
    {
      headerName: 'Thao tác',
      colId: 'thaoTac',
      width: 130,
      sortable: false,
      resizable: false,
      cellRenderer: ActionsCellComponent,
      suppressMovable: true,
      pinned: 'right',
      lockPosition: 'right',
    },
  ];

  readonly defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    suppressMovable: false,
  };

  readonly gridOptions: GridOptions<DanhMucRow> = {
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    pagination: false,
    context: {
      componentParent: this,
    },
    onSelectionChanged: (event) => {

      const selected = event.api.getSelectedRows();

      console.log('SELECTED:', selected);

      this.selectedRows.set(selected);


      if (selected.length === 0) {
        this.selectionWarning.set('');
        this.selectedAction.set(null);
        return;
      }


      const statuses = selected.map(row => row.status);

      console.log('STATUSES:', statuses);


      const firstStatus = statuses[0];

      const allSameStatus = statuses.every(
        status => status === firstStatus
      );


      if (!allSameStatus) {

        console.log('KHÁC TRẠNG THÁI');

        this.selectionWarning.set(
          'Các bản ghi được chọn phải cùng trạng thái!'
        );

        this.selectedAction.set(null);

        return;
      }


      this.selectionWarning.set('');


      if (firstStatus === 3) {
        this.selectedAction.set('approve');
      }
      else if (firstStatus === 4) {
        this.selectedAction.set('cancel');
      }
      else {
        this.selectedAction.set(null);
      }

    },

    onCellClicked: (event: CellClickedEvent<DanhMucRow>) => {

      // bỏ qua click checkbox
      if (event.colDef.checkboxSelection) {
        return;
      }

      // bỏ qua cột thao tác
      if (event.column.getColId() === 'thaoTac') {
        return;
      }

      if (event.data) {
        this.viewRecord(event.data);
      }

    },
  };

  changePage(page: number): void {
    if (
      page < 0 ||
      page >= this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.pageChange.emit(page);
  }

  changePageSize(event: Event): void {
    const size = Number(
      (event.target as HTMLSelectElement).value
    );

    this.pageSizeChange.emit(size);
  }

  onGridReady(event: GridReadyEvent<DanhMucRow>) {
    this.gridApi = event.api;
  }

  viewRecord(row: DanhMucRow): void {
    this.viewRecordEvent.emit(row);
  }

  copyRecord(row: DanhMucRow): void {
    this.copyRecordEvent.emit(row);
  }

  editRecord(row: DanhMucRow): void {
    this.editRecordEvent.emit(row);
  }

  deleteRecord(row: DanhMucRow): void {
    this.deleteRecordEvent.emit(row);
  }

  onExportExcel(): void {
    this.exportExcelEvent.emit();
  }

  onCancelApproveClick(): void {
    this.cancelApproveEvent.emit(
      this.selectedRows()
    );
  }

  onBatchApproveClick(): void {
    this.batchApproveEvent.emit(this.selectedRows());
  }

}
