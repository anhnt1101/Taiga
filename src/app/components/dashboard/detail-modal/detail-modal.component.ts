import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiInput } from '@taiga-ui/core';
import { ComponentCodeOption, DanhMucRow, STATUS_OPTIONS, } from '../../../models/danh-muc.model';
import { TuiTextarea } from '@taiga-ui/kit';
import { HasRoleDirective } from '../../../directives/has-role.directive';
import { DanhMucService } from '../../../services/danh-muc.service';

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
  selector: 'ph-detail-modal',
  standalone: true,
  imports: [FormsModule, TuiButton, TuiInput, TuiTextarea, HasRoleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail-modal.component.html',
  styleUrl: './detail-modal.component.scss',
})
export class DetailModalComponent implements OnInit {

  private readonly danhMucService =
    inject(DanhMucService);

  private readonly cdr =
    inject(ChangeDetectorRef);

  private readonly componentCodeMap =
    new Map<string, string>();
  @Input({ required: true }) row!: DanhMucRow;

  @Output() close = new EventEmitter<void>();
  @Output() submitApproval = new EventEmitter<DanhMucRow>();
  @Output() approveRow = new EventEmitter<DanhMucRow>();
  @Output() cancelApproveRow = new EventEmitter<DanhMucRow>();
  @Output() rejectRow = new EventEmitter<DanhMucRow>();
  @Output() deleteRow = new EventEmitter<DanhMucRow>();

  activeConfirmModal: 'approve' | 'cancel_approve' | 'submit_approval' | 'delete' | 'reject' | null = null;
  rejectReason = '';

  ngOnInit(): void {

    this.danhMucService
      .getComponentCodes()
      .subscribe({
        next: (options) => {
          this.componentCodeMap.clear();
          (options ?? [])
            .filter(
              (option): option is ComponentCodeOption =>
                !!option?.componentCode
            )
            .forEach(option => {
              this.componentCodeMap.set(
                option.componentCode.trim(), option.componentName?.trim() || ''
              );
            });
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error(
            'Không tải được danh sách cấu phần:',
            err
          );
        },
      });
  }

  private formatComponentCode(
    value: unknown
  ): string {

    if (value === null || value === undefined || value === '') {
      return '-';
    }

    // Nếu API trả object
    if (
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {

      const option = value as ComponentCodeOption;
      const code = option.componentCode?.trim();
      if (!code) {
        return '-';
      }

      const name = option.componentName?.trim() || this.componentCodeMap.get(code);
      return name ? `${code} - ${name}` : code;
    }

    // Nếu API trả array
    if (Array.isArray(value)) {

      return value
        .map(item =>
          this.formatComponentCode(item)
        )
        .filter(item => item !== '-')
        .join(', ');
    }

    // String: CR9 hoặc CR9,CR10
    return String(value)
      .split(',')
      .map(code => code.trim())
      .filter(Boolean)
      .map(code => {

        const name =
          this.componentCodeMap.get(code);

        return name
          ? `${code} - ${name}`
          : code;
      })
      .join(', ');
  }

  get statusCode(): number {
    if (!this.row) return 1;
    const rawStatus = this.row.status ?? (this.row as any).trangThai;
    if (typeof rawStatus === 'number') return rawStatus;
    if (typeof rawStatus === 'string') {
      const parsed = parseInt(rawStatus, 10);
      if (!isNaN(parsed)) return parsed;
    }
    if (rawStatus && typeof rawStatus === 'object' && typeof (rawStatus as any).code === 'number') {
      return (rawStatus as any).code;
    }
    return 1;
  }

  get isDisplay(): number {
    if (!this.row) return 0;
    const rawDisplay =
      this.row.isDisplay ??
      (this.row as any).is_display ??
      0;
    if (typeof rawDisplay === 'number') {
      return rawDisplay;
    }
    if (typeof rawDisplay === 'string') {
      const parsed = parseInt(rawDisplay, 10);
      if (!isNaN(parsed)) {
        return parsed;
      }
    }
    return 0;
  }

  get statusTone(): string {
    const found = STATUS_OPTIONS.find((s) => s.code === this.statusCode);
    return found?.tone || 'new';
  }

  get statusText(): string {
    const found = STATUS_OPTIONS.find((s) => s.code === this.statusCode);
    return found?.text || 'Mới';
  }

  onClose(): void {
    this.close.emit();
  }

  getOldValue(fieldName: keyof DanhMucRow): string {
    if (!this.row.newData) {
      return '-';
    }
    let val = this.row[fieldName];
    if (fieldName === 'componentCode') {
      return this.formatComponentCode(val);
    }
    if (val === undefined || val === null || val === '') {
      return '-';
    }
    if (fieldName === 'effectiveDate' || fieldName === 'endEffectiveDate') {
      return formatDateString(val);
    }
    return String(val);
  }

  getNewValue(fieldName: keyof DanhMucRow): string {
    let val: any;
    if (this.row.newData) {
      let newObj: any;
      if (
        typeof this.row.newData === 'string'
      ) {
        try {
          newObj = JSON.parse(this.row.newData);
        } catch {
          newObj = null;
        }
      } else {
        newObj = this.row.newData;
      }
      val = newObj?.[fieldName];
    }

    // Nếu newData không chứa field
    // thì lấy dữ liệu hiện tại
    if (val === undefined || val === null || val === '') {
      val = this.row[fieldName];
    }

    // Cấu phần xử lý
    if (fieldName === 'componentCode') {
      return this.formatComponentCode(val);
    }

    if (val === undefined || val === null || val === '') {
      return '-';
    }
    if (
      fieldName === 'effectiveDate' ||
      fieldName === 'endEffectiveDate'
    ) {
      return formatDateString(val);
    }
    return String(val);
  }

  isFieldChanged(fieldName: keyof DanhMucRow): boolean {
    if (!this.row.newData) {
      return false;
    }
    const oldVal = this.getOldValue(fieldName);
    const newVal = this.getNewValue(fieldName);
    return oldVal.trim() !== newVal.trim();
  }

  openConfirm(type: 'approve' | 'cancel_approve' | 'submit_approval' | 'delete' | 'reject'): void {
    this.activeConfirmModal = type;
    if (type === 'reject') {
      this.rejectReason = '';
    }
  }

  closeConfirmModal(): void {
    this.activeConfirmModal = null;
    this.rejectReason = '';
  }

  onConfirmAction(): void {
    if (!this.activeConfirmModal) return;
    switch (this.activeConfirmModal) {
      case 'approve':
        this.approveRow.emit(this.row);
        break;
      case 'cancel_approve':
        this.cancelApproveRow.emit(this.row);
        break;
      case 'submit_approval':
        this.submitApproval.emit(this.row);
        break;
      case 'delete':
        this.deleteRow.emit(this.row);
        break;
      case 'reject':
        if (this.rejectReason.trim()) {
          this.rejectRow.emit(this.row);
        }
        break;
    }
    this.closeConfirmModal();
  }

}
