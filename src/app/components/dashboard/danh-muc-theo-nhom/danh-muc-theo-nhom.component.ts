import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { finalize } from 'rxjs';
import { DanhMucRow, DanhMucFilterParams } from '../../../models/danh-muc.model';
import { DanhMucService } from '../../../services/danh-muc.service';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../table/table.component';
import { FormComponent } from '../form/form.component';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';
//test
import { Observable } from 'rxjs';

export { DanhMucRow };
type ToastAction = 'add' | 'edit' | 'export' | 'delete' | 'approve' | 'cancelApprove' | 'reject' | 'submitApproval' | 'error';
@Component({
  selector: 'ph-danh-muc-theo-nhom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiButton,
    FilterComponent,
    TableComponent,
    FormComponent,
    DetailModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './danh-muc-theo-nhom.component.html',
  styleUrl: './danh-muc-theo-nhom.component.scss',
})

export class DanhMucTheoNhomComponent implements OnInit {
  private readonly danhMucService = inject(DanhMucService);
  readonly viewMode = signal<'list' | 'add' | 'edit'>('list');
  readonly selectedRow = signal<DanhMucRow | null>(null);
  readonly detailModalRow = signal<DanhMucRow | null>(null);
  selectedDeleteRow: DanhMucRow | null = null;
  readonly showDeleteConfirm = signal(false);
  readonly toastNotification = signal<{
    show: boolean;
    row: DanhMucRow | null;
    action: ToastAction
  } | null>(null);

  readonly duplicateFields = signal({
  paramValue: false,
  paramType: false,
  effectiveDate: false,
  endEffectiveDate: false
});

  readonly batchModal = signal<{
    show: boolean;
    type: 'approve' | 'cancel';
    title: string;
    message: string;
    items?: number[];
    rows?: DanhMucRow[];
  } | null>(null);

  totalElements = 0;
  currentPage = 0;
  totalPages = 0;
  pageSize = 10;

  readonly filters: DanhMucFilterParams = {
    page: 0,
    size: this.pageSize,
    paramType: '',
    paramValue: '',
    paramName: '',
    status: null,
    isActive: null,
  };

  readonly rowData = signal<DanhMucRow[]>([]);
  readonly loading = signal<boolean>(false);

  ngOnInit(): void {
    this.search();

    this.danhMucService.connectChangeEvent().subscribe({
      next: () => {
        console.log('GroupCategory đã thay đổi');

        this.callSearchApi();
      },
      error: err => {
        console.error('SSE error:', err);
      }
    });
  }

  loadData(): void {
    this.loading.set(true);
    this.danhMucService
      .getList(this.filters)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.rowData.set(res.content);
          this.currentPage = res.number;
          this.totalPages = res.totalPages;
        },
        error: (err) => {
          console.error('Load data error:', err);
          this.loading.set(false);
          this.rowData.set([]);
          this.totalElements = 0;
        },
      });
  }

  onPageChange(page: number): void {
    this.filters.page = page;
    this.callSearchApi();
  }

  onPageSizeChange(size: number): void {
    this.filters.size = size;
    this.filters.page = 0;
    this.callSearchApi();
  }

  search(): void {
    this.filters.page = 0;
    this.callSearchApi();
  }

  private callSearchApi(): void {
    this.loading.set(true);
    this.danhMucService.search(this.filters)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (res) => {
          const dataWithStt = res.content.map((item, index) => ({
            ...item,
            stt: res.number * res.size + index + 1
          }));
          this.rowData.set(dataWithStt);
          this.currentPage = res.number;
          this.totalPages = res.totalPages;
          this.totalElements = res.totalElements;
        },
        error: (err) => {
          console.error(err);
          this.rowData.set([]);
          this.totalElements = 0;
        }
      });
  }

  clearFilters(): void {
    this.filters.page = 0;
    this.filters.paramType = '';
    this.filters.paramValue = '';
    this.filters.paramName = '';
    this.filters.status = null;
    this.filters.isActive = null;
    this.callSearchApi();
  }

  async exportExcel(): Promise<void> {
    this.danhMucService
      .exportAll(this.filters)
      .subscribe({
        next: async (response) => {
          try {
            const blob = new Blob(
              [response.body!], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
            );
            const fileHandle = await (window as any).showSaveFilePicker({
              suggestedName: 'GroupCategories.xlsx',
              types: [
                {
                  description: 'Excel File',
                  accept: {
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                  }
                }
              ]
            });
            const writable = await fileHandle.createWritable();
            await writable.write(blob);
            await writable.close();
            this.showAddSuccessToast(null, 'export');
          } catch (error) {
            console.error('Lỗi lưu file:', error);
          }
        },
        error: (err) => {
          console.error('Export API lỗi:', err);
        }
      });
  }

  addNew(): void {
    this.selectedRow.set(null);
    this.viewMode.set('add');
    this.duplicateFields.set({
      paramValue: false,
      paramType: false,
      effectiveDate: false,
      endEffectiveDate: false
    });
  }

  viewRecord(row: DanhMucRow): void {
    this.detailModalRow.set(row);
  }

  copyRecord(row: DanhMucRow): void {
    this.selectedRow.set(row);
    this.viewMode.set('add');
    this.duplicateFields.set({
      paramValue: false,
      paramType: false,
      effectiveDate: false,
      endEffectiveDate: false
    });
  }

  editRecord(row: DanhMucRow): void {
    this.selectedRow.set(row);
    this.viewMode.set('edit');
  }

  closeDetailModal(): void {
    this.detailModalRow.set(null);
  }

  ///// Hàm chung để update trạng thái của bản ghi (approve, cancel approve, reject, submit approval)
  private executeApproveAction(
    row: DanhMucRow,
    action: Observable<any>,
    errorMessage: string,
    successAction?: () => void
  ): void {
    if (!row?.id) {
      return;
    }

    action.subscribe({
      next: () => {
        this.callSearchApi();
        this.closeDetailModal();
        successAction?.();
      },
      error: (err) => {
        console.error(errorMessage, err);
        this.showAddSuccessToast(null, 'error');

      }
    });
  }

  submitApprovalFromDetail(row: DanhMucRow): void {
    this.executeApproveAction(
      row,
      this.danhMucService.submitApproval([row.id], 3),
      'Submit approve failed:',
      () => this.showAddSuccessToast(null, 'submitApproval')
    );
  }

  approveFromDetail(row: DanhMucRow): void {
    this.executeApproveAction(
      row,
      this.danhMucService.approve([row.id], 4),
      'Approve failed:',
      () => this.showAddSuccessToast(null, 'approve')
    );
  }

  cancelApproveFromDetail(row: DanhMucRow): void {
    this.executeApproveAction(
      row,
      this.danhMucService.cancelApprove([row.id], 7),
      'Cancel approve failed:',
      () => this.showAddSuccessToast(null, 'cancelApprove')
    );
  }

  rejectFromDetail(row: DanhMucRow): void {
    this.executeApproveAction(
      row,
      this.danhMucService.reject([row.id], 5),
      'Reject failed:',
      () => this.showAddSuccessToast(null, 'reject')
    );
  }

  confirmDelete(): void {
    if (!this.selectedDeleteRow) { return; }
    this.danhMucService
      .delete(this.selectedDeleteRow.id || this.selectedDeleteRow.stt)
      .subscribe(() => {
        this.callSearchApi();
        this.showAddSuccessToast(null, 'delete');
        this.closeDeleteConfirm();
      });
  }

  deleteFromDetail(row: DanhMucRow): void {
    this.danhMucService.delete(row.id || row.stt).subscribe(() => {
      this.callSearchApi();
      this.showAddSuccessToast(null, 'delete');
    });
    this.closeDetailModal();
  }

  deleteRecord(row: DanhMucRow): void {
    this.selectedDeleteRow = row;
    this.showDeleteConfirm.set(true);
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm.set(false);
    this.selectedDeleteRow = null;
  }

  closeToast(): void {
    this.toastNotification.set(null);
  }

  viewDetailFromToast(): void {
    const row = this.toastNotification()?.row;
    this.closeToast();
    if (row) {
      this.viewRecord(row);
    }
  }

  showAddSuccessToast(row: DanhMucRow | null, action: ToastAction): void {
    this.toastNotification.set({ show: true, row, action });
    setTimeout(() => {
      this.toastNotification.set(null);
    }, 4000);
  }

  onCancelAll(rows: DanhMucRow[]): void {
    this.batchModal.set({
      show: true,
      type: 'cancel',
      title: 'Xác nhận hủy duyệt',
      message: `Bạn có chắc chắn muốn hủy duyệt ${rows.length} bản ghi?`,
      items: rows.map(r => r.id),
    });
  }

  handleBatchApprove(rows: DanhMucRow[]): void {
    this.batchModal.set({
      show: true,
      type: 'approve',
      title: 'Xác nhận phê duyệt',
      message: `Bạn có chắc chắn muốn duyệt ${rows.length} bản ghi?`,
      items: rows.map(r => r.id!),
      rows: rows,
    });
  }

  confirmBatchApprove(): void {
    const modal = this.batchModal();
    if (!modal || !modal.items?.length) {
      this.closeBatchModal();
      return;
    }
    const action$ = modal.type === 'approve'
      ? this.danhMucService.approve(modal.items, 4)
      : this.danhMucService.cancelApprove(modal.items, 7);
    action$.subscribe({
      next: () => {
        this.closeBatchModal();
        this.callSearchApi();
        if (modal.type === 'approve') {
          this.showAddSuccessToast(null, 'approve');
        } else {
          this.showAddSuccessToast(null, 'cancelApprove');
        }
      },
      error: (err) => {
        console.error(err);
        this.closeBatchModal();
        this.showAddSuccessToast(null, 'error');
      }
    });
  }

  closeBatchModal(): void {
    this.batchModal.set(null);
  }

  onFormClose(): void {
    this.viewMode.set('list');
    this.selectedRow.set(null);
  }

  handleDuplicateError(err: any): void {
    if (err.status !== 409) {
      return;
    }

    this.duplicateFields.set({
      paramValue: true,
      paramType: true,
      effectiveDate: true,
      endEffectiveDate: true
    });
  }

  onFormSave(event: { row: Partial<DanhMucRow>; submitForApproval: boolean }): void {
    if (this.viewMode() === 'add') {
      this.danhMucService.create(
        event.row,
        event.submitForApproval
      ).subscribe({
        next: (newRow) => {
          this.callSearchApi();
          this.onFormClose();
          this.showAddSuccessToast(newRow, 'add');
        },
        error: (err) => {
          this.handleDuplicateError(err);
        }
      });
    } else if (this.viewMode() === 'edit' && this.selectedRow()) {
      const selected = this.selectedRow()!;
      this.danhMucService
        .update(selected, event.row, event.submitForApproval)
        .subscribe({
          next: (newRow) => {
            this.callSearchApi();
            this.onFormClose();
            this.showAddSuccessToast(newRow, 'edit');
          },
          error: (err) => this.handleDuplicateError(err)
        });
    }
  }

}
