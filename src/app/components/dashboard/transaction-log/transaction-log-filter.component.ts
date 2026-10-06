import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiCalendar, TuiDropdown, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiInputDateTime, TuiSelect } from '@taiga-ui/kit';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TransactionLogFilterParams, TransactionStatus } from '../../../models/transaction-log.model';

@Component({
  selector: 'ph-transaction-log-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TuiButton,
    TuiCalendar,
    TuiDropdown,
    TuiInput,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiInputDateTime,
    TuiSelect,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-log-filter.component.html',
  styleUrl: './transaction-log-filter.component.scss',
})
export class TransactionLogFilterComponent {
  @Output() readonly filtersApplied = new EventEmitter<TransactionLogFilterParams>();
  readonly loading = signal<boolean>(false);
  setLoading(value: boolean): void {
    this.loading.set(value);
  }

  readonly statusItems: Array<TransactionStatus | ''> = ['', 'SUCCESS', 'FAILED'];

  readonly stringifyStatus = (value: TransactionStatus | ''): string => {
    const labels: Record<string, string> = {
      '': 'Tất cả trạng thái',
      SUCCESS: 'SUCCESS',
      FAILED: 'FAILED',
    };
    return labels[value] ?? value;
  };

  readonly filters: TransactionLogFilterParams = {
    transactionCode: '',
    accountNo: '',
    status: '',
    minAmount: null,
    maxAmount: null,
    fromDate: '',
    toDate: '',
  };

  fromDateValue: [TuiDay, TuiTime] | null = null;
  toDateValue: [TuiDay, TuiTime] | null = null;

  onFromDateChange(value: [TuiDay, TuiTime] | null): void {
    this.fromDateValue = value;
    this.filters.fromDate = this.formatTuiDateTime(value);
  }

  onToDateChange(value: [TuiDay, TuiTime] | null): void {
    this.toDateValue = value;
    this.filters.toDate = this.formatTuiDateTime(value);
  }

  private formatTuiDateTime(value: [TuiDay, TuiTime] | null): string {
    if (!value) {
      return '';
    }
    const [day, time] = value;
    const year = String(day.year);
    const month = String(day.month + 1).padStart(2, '0');
    const date = String(day.day).padStart(2, '0');
    // Nếu không có giờ/phút thì mặc định 00:00
    const hour = String(time?.hours ?? 0).padStart(2, '0');
    const minute = String(time?.minutes ?? 0).padStart(2, '0');
    return `${date}/${month}/${year} ${hour}:${minute}`;
  }

  onSearch(): void {
    this.filtersApplied.emit({
      ...this.filters,
    });
  }

  onClearFilters(): void {
    this.filters.transactionCode = '';
    this.filters.accountNo = '';
    this.filters.status = '';
    this.filters.minAmount = null;
    this.filters.maxAmount = null;
    this.filters.fromDate = '';
    this.filters.toDate = '';

    this.fromDateValue = null;
    this.toDateValue = null;

    this.filtersApplied.emit({
      ...this.filters,
    });
  }
}
