import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TransactionStatus } from '../../../models/transaction-log.model';

@Component({
  selector: 'ph-transaction-status-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (status) {
      @case ('SUCCESS') {
        <span class="status-badge status-badge--success">
          <span class="dot"></span>
          SUCCESS
        </span>
      }
      @case ('FAILED') {
        <span class="status-badge status-badge--danger">
          <span class="dot"></span>
          FAILED
        </span>
      }
    }
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
      }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 3px 9px;
        border-radius: 9999px;
        font-size: 11.5px;
        font-weight: 600;
        line-height: 1.4;
        white-space: nowrap;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        &--success {
          background: #e6f6ee;
          color: #0b7a48;
          .dot {
            background: #17a35d;
          }
        }
        &--warning {
          background: #fef5ea;
          color: #b55d04;
          .dot {
            background: #f0983c;
          }
        }
        &--info {
          background: #e8f3fc;
          color: #1a6fb0;
          .dot {
            background: #2563eb;
          }
        }
        &--danger {
          background: #fef0ef;
          color: #cf271a;
          .dot {
            background: #e53935;
          }
        }
        &--purple {
          background: #f3e8ff;
          color: #7e22ce;
          .dot {
            background: #9333ea;
          }
        }
        &--neutral {
          background: #f1f3f5;
          color: #495057;
          .dot {
            background: #868e96;
          }
        }
      }
    `,
  ],
})
export class TransactionStatusCellComponent implements ICellRendererAngularComp {
  status: TransactionStatus = 'SUCCESS';

  agInit(params: ICellRendererParams): void {
    this.status = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    this.status = params.value;
    return true;
  }
}
