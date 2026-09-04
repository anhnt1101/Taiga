import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { HasRoleDirective, } from '../../../directives/has-role.directive';

@Component({
  selector: 'ph-actions-cell',
  standalone: true,
  imports: [CommonModule, TuiButton, HasRoleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="actions">
      <!-- Sao chép (Copy) -->
      <button
        class="action-btn action-btn--copy"
        tuiButton
        appearance="flat"
        size="s"
        type="button"
        title="Sao chép"
        (click)="onCopy($event)"
         *phHasRole="['ROLE_MAKER','ROLE_ADMIN']"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>

      <!-- Sửa (Edit) -->
      @if (canEdit()) {
        <button
          class="action-btn action-btn--edit"
          tuiButton
          appearance="flat"
          size="s"
          type="button"
          title="Chỉnh sửa"
          (click)="onEdit($event)"
          *phHasRole="['ROLE_MAKER','ROLE_ADMIN']"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      }

      <!-- Xóa (Delete) -->
       @if (canDelete()) {
        <button
          class="action-btn action-btn--delete"
          tuiButton
          appearance="flat"
          size="s"
          type="button"
          title="Xóa bản ghi"
          (click)="onDelete($event)"
           *phHasRole="['ROLE_ADMIN']"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      }
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
      .action-btn {
        width: 30px;
        height: 30px;
        padding: 0;
        border-radius: 6px;
        border: 1px solid var(--ph-border, #e2e8f0);
        background: #ffffff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .action-btn svg {
        width: 15px;
        height: 15px;
      }
      .action-btn--copy {
        color: #0e6e5a;
      }
      .action-btn--copy:hover {
        background: #e6f7f0;
        border-color: #0e6e5a;
      }
      .action-btn--edit {
        color: #0284c7;
      }
      .action-btn--edit:hover {
        background: #f0f9ff;
        border-color: #0284c7;
      }
      .action-btn--delete {
        color: #e11d48;
      }
      .action-btn--delete:hover {
        background: #fff1f2;
        border-color: #e11d48;
      }
    `,
  ],
})
export class ActionsCellComponent implements ICellRendererAngularComp {
  private params?: ICellRendererParams;

  canEdit(): boolean {
    const status = this.params?.data?.status;
    return status !== 3 && status !== 4;
  }

  canDelete(): boolean {
    const status = this.params?.data?.status;
    const isDisplay = this.params?.data?.isDisplay;
    return status !== 3 && status !== 4 && isDisplay === 1;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onCopy(e: MouseEvent): void {
    e.stopPropagation();
    if (this.params?.context?.componentParent) {
      this.params.context.componentParent.copyRecord(this.params.data);
    }
  }

  onEdit(e: MouseEvent): void {
    e.stopPropagation();
    if (this.params?.context?.componentParent) {
      this.params.context.componentParent.editRecord(this.params.data);
    }
  }

  onDelete(e: MouseEvent): void {
    e.stopPropagation();
    if (this.params?.context?.componentParent) {
      this.params.context.componentParent.deleteRecord(this.params.data);
    }
  }
}
