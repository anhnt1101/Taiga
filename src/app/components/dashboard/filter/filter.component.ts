import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiInput, TuiTextfield ,TuiDropdown} from '@taiga-ui/core';
import {  TuiDataListWrapper,TuiChevron, TuiSelect } from '@taiga-ui/kit';
import { DanhMucFilterParams } from '../../../models/danh-muc.model';

@Component({
  selector: 'ph-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiButton,
    TuiInput,
    TuiTextfield,
    TuiSelect,
    TuiChevron,
    TuiDropdown,
    TuiDataListWrapper,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {

  @Input({ required: true })
  filters!: DanhMucFilterParams;

  @Input()
  loading = false;

  @Output()
  search = new EventEmitter<void>();

  @Output()
  clearFilters = new EventEmitter<void>();

  readonly statusItems = ['', '1', '3', '4', '5', '7'];
  readonly isActiveItems = ['', '1', '0'];

  private readonly isActiveLabels: Record<string, string> = {
    '': 'Tất cả',
    '1': 'Đang hoạt động',
    '0': 'Ngừng hoạt động',
  };

  private readonly statusLabels: Record<string, string> = {
    '': 'Tất cả',
    '1': '1 - Mới',
    '3': '3 - Chờ duyệt',
    '4': '4 - Đã duyệt',
    '5': '5 - Từ chối',
    '7': '7 - Hủy duyệt',
  };

  readonly stringifyStatus = (value: string): string => this.statusLabels[value] ?? value;
  readonly stringifyIsActive = (value: string): string => this.isActiveLabels[value] ?? value;

  onSearch(): void {
    this.search.emit();
  }

  onClear(): void {
    this.clearFilters.emit();
  }
}