import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { STATUS_OPTIONS, StatusValue } from '../../../models/danh-muc.model';

@Component({
  selector: 'ph-status-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (value) {
      <span class="status-pill" [class]="'status-pill--' + value.tone">
        <span class="status-pill__icon">
          @if (value.tone === 'success') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          } @else if (value.tone === 'new') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3.5" fill="#fff" />
            </svg>
          } @else if (value.tone === 'pending') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 7v5l3 2" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          } @else if (value.tone === 'rejected') {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" />
            </svg>
          }
        </span>
        <span class="status-pill__text">{{ value.code }} - {{ value.text }}</span>
      </span>
    }
  `,
  styles: [
    `
      .status-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 2px 10px 2px 6px;
        border-radius: 14px;
        font-size: 12.5px;
        font-weight: 500;
        line-height: 1.4;
      }
      .status-pill__icon {
        width: 15px;
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .status-pill__icon svg {
        width: 100%;
        height: 100%;
      }

      /* 4 - Đã duyệt (Green) */
      .status-pill--success {
        background: #e6f7ef;
        color: #0e6e5a;
      }
      .status-pill--success .status-pill__icon {
        color: #17a35d;
      }

      /* 1 - Mới (Teal) */
      .status-pill--new {
        background: #e0f2f1;
        color: #00695c;
      }
      .status-pill--new .status-pill__icon {
        color: #00897b;
      }

      /* 3 - Chờ duyệt (Orange) */
      .status-pill--pending {
        background: #fff3e0;
        color: #e65100;
      }
      .status-pill--pending .status-pill__icon {
        color: #f57c00;
      }

      /* 5 - Từ chối (Red) */
      .status-pill--rejected {
        background: #fde8e8;
        color: #9b1c1c;
      }
      .status-pill--rejected .status-pill__icon {
        color: #e11d48;
      }

      /* 7 - Hủy duyệt (Gray) */
      .status-pill--canceled {
        background: #f3f4f6;
        color: #4b5563;
      }
      .status-pill--canceled .status-pill__icon {
        color: #6b7280;
      }
    `,
  ],
})
export class StatusCellComponent implements ICellRendererAngularComp {
  value?: StatusValue;

  agInit(params: ICellRendererParams<unknown, number | StatusValue>): void {
    this.setStatus(params.value);
  }

  refresh(params: ICellRendererParams<unknown, number | StatusValue>): boolean {
    this.setStatus(params.value);
    return true;
  }

  private setStatus(val: any): void {
    if (typeof val === 'number') {
      this.value = STATUS_OPTIONS.find((s) => s.code === val) || STATUS_OPTIONS[0];
    } else if (typeof val === 'string') {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        this.value = STATUS_OPTIONS.find((s) => s.code === parsed) || STATUS_OPTIONS[0];
      } else {
        const lower = val.toLowerCase();
        this.value = STATUS_OPTIONS.find((s) => s.text.toLowerCase().includes(lower) || s.tone === lower) || STATUS_OPTIONS[0];
      }
    } else if (val && typeof val === 'object') {
      if ('code' in val && typeof val.code === 'number') {
        this.value = STATUS_OPTIONS.find((s) => s.code === val.code) || val;
      } else {
        this.value = val;
      }
    } else {
      this.value = STATUS_OPTIONS[0];
    }
  }
}

