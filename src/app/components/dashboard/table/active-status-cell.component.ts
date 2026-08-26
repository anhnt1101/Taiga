import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'ph-active-status-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="active-text">
      {{ isActive ? 'Hoạt động' : 'Không hoạt động' }}
    </span>
  `,
  styles: [
    `
      .active-text {
        font-size: 13.5px;
        color: #2c3e50;
        font-weight: 400;
      }
    `,
  ],
})
export class ActiveStatusCellComponent implements ICellRendererAngularComp {
  isActive = true;

  agInit(params: ICellRendererParams<unknown, any>): void {
    this.setIsActive(params.value, params.data);
  }

  refresh(params: ICellRendererParams<unknown, any>): boolean {
    this.setIsActive(params.value, params.data);
    return true;
  }

  private setIsActive(val: any, data?: any): void {
    const raw = val ?? data?.trangThaiHoatDong ?? data?.active;
    if (
      raw === 'inactive' ||
      raw === 0 ||
      raw === '0' ||
      raw === false ||
      raw === 'Không hoạt động' ||
      raw === 'NGUNG_HOAT_DONG'
    ) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }
}
