import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TuiButton,
  TuiDropdown,
  TuiInput,
  TuiTextfield,
} from '@taiga-ui/core';

import {
  TuiChevron,
  TuiDataListWrapper,
  TuiSelect,
} from '@taiga-ui/kit';

import {
  DanhMucFilterParams,
} from '../../../models/danh-muc.model';


@Component({
  selector: 'ph-filter',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,

    TuiButton,
    TuiInput,
    TuiTextfield,
    TuiDropdown,

    TuiSelect,
    TuiChevron,
    TuiDataListWrapper,
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,

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


  readonly statusItems: Array<number | null> = [
    null,
    1,
    3,
    4,
    5,
    7,
  ];

  readonly isActiveItems: Array<number | null> = [
    null,
    1,
    0,
  ];


  private readonly statusLabels: Record<number, string> = {
    1: '1 - Mới',
    3: '3 - Chờ duyệt',
    4: '4 - Đã duyệt',
    5: '5 - Từ chối',
    7: '7 - Hủy duyệt',
  };


  private readonly isActiveLabels: Record<number, string> = {
    1: 'Đang hoạt động',
    0: 'Ngừng hoạt động',
  };


  readonly stringifyStatus = (
    value: number | null
  ): string => {

    if (value === null) {
      return 'Tất cả';
    }

    return (
      this.statusLabels[value] ??
      String(value)
    );
  };


  readonly stringifyIsActive = (
    value: number | null
  ): string => {

    if (value === null) {
      return 'Tất cả';
    }

    return (
      this.isActiveLabels[value] ??
      String(value)
    );
  };


  onSearch(): void {
    this.search.emit();
  }


  onClear(): void {
    this.clearFilters.emit();
  }
}