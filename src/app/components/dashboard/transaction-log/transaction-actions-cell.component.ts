import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TransactionLogRow } from '../../../models/transaction-log.model';

@Component({
  selector: 'ph-transaction-actions-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="actions">
      <button type="button" class="icon-btn" title="Xem chi tiết giao dịch" (click)="onView($event)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      <button
        type="button"
        class="icon-btn"
        [title]="copied ? 'Đã sao chép mã!' : 'Sao chép mã giao dịch'"
        (click)="onCopy($event)"
      >
        @if (copied) {
          <svg viewBox="0 0 24 24" fill="none" stroke="#17a35d" stroke-width="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        }
      </button>
    </div>
  `,
  styles: [
    `
      .actions {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 100%;
      }
      .icon-btn {
        background: transparent;
        border: 1px solid transparent;
        cursor: pointer;
        padding: 5px;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #4b5563;
        transition: all 0.15s ease;

        svg {
          width: 15px;
          height: 15px;
        }

        &:hover {
          background: #eef7f3;
          color: #0e6e5a;
          border-color: #c7e5dc;
        }
      }
    `,
  ],
})
export class TransactionActionsCellComponent implements ICellRendererAngularComp {
  private params!: ICellRendererParams;
  copied = false;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onView(event: MouseEvent): void {
    event.stopPropagation();
    const parent = this.params.context?.componentParent;
    if (parent && this.params.data) {
      parent.viewRecord(this.params.data as TransactionLogRow);
    }
  }

  onCopy(event: MouseEvent): void {
    event.stopPropagation();
    const data = this.params.data as TransactionLogRow;
    if (data?.transactionCode && navigator?.clipboard) {
      navigator.clipboard.writeText(data.transactionCode);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
}
