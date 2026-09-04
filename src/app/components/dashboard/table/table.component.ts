import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, } from 'ag-grid-community';
import { DanhMucRow, ComponentCodeOption, } from '../../../models/danh-muc.model';
import { StatusCellComponent } from './status-cell.component';
import { ActiveStatusCellComponent } from './active-status-cell.component';
import { ActionsCellComponent } from './actions-cell.component';
import { HasRoleDirective, } from '../../../directives/has-role.directive';

function formatDateString(val: any): string {
  if (val === undefined || val === null) {
    return '';
  }

  if (typeof val === 'number') {
    const d = new Date(
      val > 10000000000
        ? val
        : val * 1000
    );

    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();

      return `${day}/${month}/${year}`;
    }
  }

  const str = String(val).trim();

  if (!str) {
    return '';
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const parts = str
      .split('T')[0]
      .split('-');

    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  }

  return str;
}


@Component({
  selector: 'ph-table',
  standalone: true,
  imports: [
    CommonModule,
    TuiButton,
    AgGridAngular,
    HasRoleDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {

  /*
   * =========================
   * PAGINATION
   * =========================
   */
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() pageSize = 0;
  @Input() totalElements = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  readonly pageSizes = [
    10,
    20,
    50,
    100,
  ];


  /*
   * =========================
   * GRID API
   * =========================
   */

  private gridApi!: GridApi<DanhMucRow>;


  /*
   * =========================
   * INPUT
   * =========================
   */

  @Input({ required: true }) rowData: DanhMucRow[] = [];
  @Input() loading = false;


  /*
   * =========================
   * SIGNAL
   * =========================
   */

  readonly selectedRows = signal<DanhMucRow[]>([]);
  readonly selectionWarning = signal<string>('');
  readonly selectedAction = signal<'approve' | 'cancel' | null>(null);


  /*
   * =========================
   * OUTPUT EVENTS
   * =========================
   */

  @Output() viewRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() copyRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() editRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() deleteRecordEvent = new EventEmitter<DanhMucRow>();
  @Output() exportExcelEvent = new EventEmitter<void>();
  @Output() batchApproveEvent = new EventEmitter<DanhMucRow[]>();
  @Output() cancelApproveEvent = new EventEmitter<DanhMucRow[]>();

  /*
   * =========================
   * COLUMN DEFINITIONS
   * =========================
   */
  readonly columnDefs: ColDef<DanhMucRow>[] = [
    /*
     * Checkbox
     */
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


    //STT
    {
      headerName: 'STT',
      field: 'stt',
      width: 70,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },


    // Danh mục theo nhóm
    {
      headerName: 'Danh mục theo nhóm',
      field: 'paramType',
      minWidth: 180,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },


    //Giá trị thành phần
    {
      headerName: 'Giá trị thành phần',
      field: 'paramValue',
      width: 150,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },


    //Tên thành phần
    {
      headerName: 'Tên thành phần',
      field: 'paramName',
      width: 150,
      pinned: 'left',
      suppressMovable: true,
      lockPosition: 'left',
    },

    //Mô tả
    {
      headerName: 'Mô tả',
      field: 'description',
      width: 180,
    },


    // Cấu phần xử lý
    {
      headerName: 'Cấu phần xử lý',
      field: 'componentCode',
      width: 150,
      valueGetter: (params) => {
        const val =
          params.data?.componentCode ||
          (params.data as any)?.cauPhanXuLy;

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


    //Ngày hiệu lực
    {
      headerName: 'Ngày hiệu lực',
      field: 'effectiveDate',
      width: 160,

      valueGetter: (params) => {
        const row = params.data;

        if (!row) {
          return '';
        }
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


    //Ngày hết hiệu lực
    {
      headerName: 'Ngày hết hiệu lực',
      field: 'endEffectiveDate',
      width: 140,

      valueGetter: (params) => {
        const row = params.data;

        if (!row) {
          return '';
        }

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


    //Trạng thái tham số
    {
      headerName: 'Trạng thái tham số',
      field: 'status',
      minWidth: 170,

      valueGetter: (params) => {
        const row = params.data;

        if (!row) {
          return 1;
        }

        const rawStatus =
          row.status ??
          (row as any).trangThai;

        if (typeof rawStatus === 'number') {
          return rawStatus;
        }

        if (typeof rawStatus === 'string') {
          const parsed = parseInt(
            rawStatus,
            10
          );

          if (!isNaN(parsed)) {
            return parsed;
          }
        }

        if (
          rawStatus &&
          typeof rawStatus === 'object' &&
          typeof (rawStatus as any).code === 'number'
        ) {
          return (rawStatus as any).code;
        }

        return 1;
      },

      cellRenderer: StatusCellComponent,
    },


    //Trạng thái hoạt động
    {
      headerName: 'Trạng thái hoạt động',
      field: 'isActive',
      minWidth: 160,

      valueGetter: (params) => {
        const row = params.data;

        if (!row) {
          return 1;
        }

        const rawActive = (
          row.isActive ??
          (row as any).trangThaiHoatDong ??
          (row as any).active
        ) as any;

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

    //Thao tác
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

  //DEFAULT COLUMN
  readonly defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    suppressMovable: false,
  };

  //GRID OPTIONS
  readonly gridOptions: GridOptions<DanhMucRow> = {

    /*
     * Pagination của AG Grid tắt
     * vì đang dùng pagination custom bên ngoài.
     */
    pagination: false,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    context: {
      componentParent: this,
    },

    //SELECT ROW
    onSelectionChanged: (event) => {
      const selected = event.api.getSelectedRows();
      console.log('SELECTED:', selected);
      this.selectedRows.set(selected);

      // Không chọn bản ghi nào
      if (selected.length === 0) {
        this.selectionWarning.set('');
        this.selectedAction.set(null);
        return;
      }

      //Lấy status của các row
      const statuses = selected.map(row => row.status);

      console.log('STATUSES:', statuses);

      const firstStatus = statuses[0];

      //Kiểm tra các row có cùng status không
      const allSameStatus =
        statuses.every(
          status =>
            status === firstStatus
        );

      // Khác trạng thái
      if (!allSameStatus) {
        console.log(
          'KHÁC TRẠNG THÁI'
        );
        this.selectionWarning.set(
          'Các bản ghi được chọn phải cùng trạng thái!'
        );
        this.selectedAction.set(null);
        return;
      }

      //Cùng trạng thái
      this.selectionWarning.set('');

      //Chờ duyệt
      if (firstStatus === 3) {
        this.selectedAction.set(
          'approve'
        );
      }
      // Đã duyệt
      else if (firstStatus === 4) {
        this.selectedAction.set(
          'cancel'
        );
      }
      //Các trạng thái khác
      else {
        this.selectedAction.set(null);
      }
    },

    //CLICK CELL
    onCellClicked: (event: CellClickedEvent<DanhMucRow>) => {

      //Không mở detail khi click checkbox
      if (
        event.colDef.checkboxSelection
      ) {
        return;
      }

      //cột thao tác
      if (
        event.column.getColId() ===
        'thaoTac'
      ) {
        return;
      }
      //Click row -> xem chi tiết
      if (event.data) {
        this.viewRecord(
          event.data
        );
      }
    },
  };

  //PAGINATION
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
      (
        event.target as HTMLSelectElement
      ).value
    );
    this.pageSizeChange.emit(size);
  }

  //GRID READY
  onGridReady(
    event: GridReadyEvent<DanhMucRow>
  ): void {

    this.gridApi = event.api;
  }

  //VIEW
  viewRecord(
    row: DanhMucRow
  ): void {

    this.viewRecordEvent.emit(row);
  }

  //COPY
  copyRecord(
    row: DanhMucRow
  ): void {

    this.copyRecordEvent.emit(row);
  }


  //EDIT
  editRecord(
    row: DanhMucRow
  ): void {

    this.editRecordEvent.emit(row);
  }

  // DELETE
  deleteRecord(
    row: DanhMucRow
  ): void {

    this.deleteRecordEvent.emit(row);
  }

  //EXPORT EXCEL
  onExportExcel(): void {

    this.exportExcelEvent.emit();
  }

  //CANCEL APPROVE
  onCancelApproveClick(): void {

    this.cancelApproveEvent.emit(
      this.selectedRows()
    );
  }

  // BATCH APPROVE
  onBatchApproveClick(): void {
    this.batchApproveEvent.emit(
      this.selectedRows()
    );
  }

}