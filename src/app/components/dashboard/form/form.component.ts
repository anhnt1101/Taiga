import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDropdown, TuiCalendar, TuiInput, TuiTextfield } from '@taiga-ui/core';
import { TuiInputDateTime, TuiChevron, TuiMultiSelect } from '@taiga-ui/kit';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { DanhMucRow, ComponentCodeOption } from '../../../models/danh-muc.model';
import { DanhMucService } from '../../../services/danh-muc.service';

@Component({
  selector: 'ph-form',
  standalone: true,
  imports: [
    FormsModule,
    TuiButton,
    TuiTextfield,
    TuiInput,
    TuiInputDateTime,
    TuiDropdown,
    TuiCalendar,
    TuiChevron,
    TuiMultiSelect
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})

export class FormComponent implements OnInit {
  private readonly danhMucService = inject(DanhMucService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) mode: 'add' | 'edit' = 'add';
  @Input() initialData: DanhMucRow | null = null;
  @Input() duplicateFields = {
    paramValue: false,
    paramType: false,
    effectiveDate: false,
    endEffectiveDate: false
  };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{ row: Partial<DanhMucRow>; submitForApproval: boolean }>();

  submitted = false;
  componentCodeItems: string[] = [];
  selectedComponentCodes: string[] = [];

  //Validation date
  effectiveDateError = '';
  endEffectiveDateError = '';

  effectiveDateTime: [TuiDay, TuiTime] | null = null;
  endEffectiveDateTime: [TuiDay, TuiTime] | null = null;

  // Điều khiển đóng/mở dropdown lịch, khớp [(tuiDropdownOpen)] trong HTML
  isEffectiveCalendarOpen = false;
  isEndEffectiveCalendarOpen = false;

  form: Partial<DanhMucRow> = {
    paramType: '',
    paramValue: '',
    paramName: '',
    description: '',
    componentCode: '',
    effectiveDate: '',
    endEffectiveDate: '',
    isActive: 1,
    newData: null,
  };

  ngOnInit(): void {
    if (this.initialData) {
      const dataToLoad = { ...this.initialData };
      const newData = this.initialData.newData;
      if (newData && typeof newData === 'object') {
        Object.assign(dataToLoad, newData);
      } else if (typeof newData === 'string') {
        try {
          const parsed = JSON.parse(newData);
          if (parsed && typeof parsed === 'object') {
            Object.assign(dataToLoad, parsed);
          }
        } catch (e) { }
      }

      const pType = dataToLoad.paramType || '';
      const pVal = dataToLoad.paramValue || '';
      const pName = dataToLoad.paramName || '';
      const pDesc = dataToLoad.description || '';

      let compCodeStr = '';
      let compCodesArr: string[] = [];
      const rawComp = dataToLoad.componentCode || (dataToLoad as any).cauPhanXuLy;
      if (Array.isArray(rawComp)) {
        compCodesArr = rawComp
          .map((item) => (typeof item === 'string' ? item : (item as ComponentCodeOption)?.componentCode || ''))
          .filter((v) => !!v);
        compCodeStr = compCodesArr.join(',');
      } else if (typeof rawComp === 'string') {
        compCodeStr = rawComp;
        compCodesArr = rawComp.split(',').map((v) => v.trim()).filter((v) => !!v);
      } else if (rawComp && typeof rawComp === 'object') {
        compCodeStr = (rawComp as ComponentCodeOption).componentCode || '';
        compCodesArr = compCodeStr ? [compCodeStr] : [];
      }

      const effDate = dataToLoad.effectiveDate || '';
      const endEffDate = dataToLoad.endEffectiveDate || '';

      const rawActive = (dataToLoad.isActive ?? (dataToLoad as any).trangThaiHoatDong) as any;
      const activeVal =
        rawActive === 'inactive' ||
          rawActive === 0 ||
          rawActive === '0' ||
          rawActive === false ||
          rawActive === 'Không hoạt động' ||
          rawActive === 'NGUNG_HOAT_DONG'
          ? 0
          : 1;

      this.form = {
        ...dataToLoad,
        paramType: pType,
        paramValue: pVal,
        paramName: pName,
        description: pDesc,
        componentCode: compCodeStr,
        effectiveDate: effDate,
        endEffectiveDate: endEffDate,
        isActive: activeVal,
      };

      this.selectedComponentCodes = compCodesArr;

      // Đồng bộ string từ BE vào 2 biến picker
      this.effectiveDateTime = this.parseToTuiDateTime(effDate);
      this.endEffectiveDateTime = this.parseToTuiDateTime(endEffDate);

      if (this.mode === 'add') {
        delete this.form.id;
        delete this.form.stt;
        this.form.status = 1;
        this.form.isActive = 1;
      }

      compCodesArr.forEach((code) => {
        if (code && !this.componentCodeItems.includes(code)) {
          this.componentCodeItems.push(code);
        }
      });
    }
    this.danhMucService.getComponentCodes().subscribe((options) => {
      if (options && options.length > 0) {
        for (const opt of options) {
          if (!this.componentCodeItems.includes(opt.componentCode + " - " + opt.componentName)) {
            this.componentCodeItems.push(opt.componentCode + " - " + opt.componentName);
          }
        }
      }
      this.cdr.markForCheck();
    });
  }

  //click chọn ngày trên lịch Ngày hiệu lực
  onEffectiveDayClick(day: TuiDay): void {
    const time = this.effectiveDateTime?.[1] ?? new TuiTime(new Date().getHours(), new Date().getMinutes());
    this.effectiveDateTime = [day, time];
    this.validateEffectiveDate();
    this.form.effectiveDate = this.formatFromTuiDateTime(this.effectiveDateTime);
    this.isEffectiveCalendarOpen = false;
  }

  onEndEffectiveDayClick(day: TuiDay): void {
    const time = this.endEffectiveDateTime?.[1] ?? new TuiTime(new Date().getHours(), new Date().getMinutes());
    this.endEffectiveDateTime = [day, time];
    this.validateEndEffectiveDate();
    this.form.endEffectiveDate = this.formatFromTuiDateTime(this.endEffectiveDateTime);
    this.isEndEffectiveCalendarOpen = false;
  }

  /** "dd/MM/yyyy HH:mm" -> [TuiDay, TuiTime]. Dùng khi load dữ liệu từ BE vào picker. */
  private parseToTuiDateTime(raw: string | null | undefined): [TuiDay, TuiTime] | null {
    if (!raw) return null;
    const [datePart, timePart] = raw.trim().split(' ');
    const dateSegs = datePart?.split('/').map(Number);
    if (!dateSegs || dateSegs.length !== 3 || dateSegs.some(isNaN)) return null;
    const [dd, mm, yyyy] = dateSegs;
    let hh = 0;
    let mi = 0;
    if (timePart) {
      const timeSegs = timePart.split(':').map(Number);
      [hh, mi] = [timeSegs[0] || 0, timeSegs[1] || 0];
    }
    return [new TuiDay(yyyy, mm - 1, dd), new TuiTime(hh, mi)];
  }

  /** [TuiDay, TuiTime] -> "dd/MM/yyyy HH:mm". Dùng khi build payload gửi lên BE. */
  private formatFromTuiDateTime(
    value: [TuiDay, TuiTime] | null
  ): string {
    if (!value || !value[0] || !value[1]) {
      return '';
    }
    const [day, time] = value;
    const dd = String(day.day).padStart(2, '0');
    const mm = String(day.month + 1).padStart(2, '0');
    const yyyy = day.year;
    const hh = String(time.hours).padStart(2, '0');
    const mi = String(time.minutes).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
  }

  onCancel(): void {
    this.close.emit();
  }

  isFieldInvalid(fieldName: keyof DanhMucRow): boolean {
    if (!this.submitted) return false;
    if (fieldName === 'componentCode') {
      return this.selectedComponentCodes.length === 0;
    }
    const val = this.form[fieldName];
    return !val || (typeof val === 'string' && val.trim() === '');
  }

  clearDuplicate(field: keyof typeof this.duplicateFields): void {
    this.duplicateFields[field] = false;
  }

  // [TuiDay, TuiTime] -> Date (null nếu thiếu ngày hoặc giờ).
  private toJsDate(value: [TuiDay, TuiTime] | null): Date | null {
    if (!value || !value[0] || !value[1]) return null;
    const [day, time] = value;
    return new Date(day.year, day.month, day.day, time.hours, time.minutes, 0);
  }

  validateEffectiveDate(): boolean {
    this.effectiveDateError = '';
    const inputDate = this.toJsDate(this.effectiveDateTime);
    if (!inputDate) {
      this.effectiveDateError = 'Ngày hiệu lực không được để trống.';
      return false;
    }
    if (isNaN(inputDate.getTime()) || inputDate < new Date()) {
      this.effectiveDateError = 'Ngày hiệu lực không hợp lệ.';
      return false;
    }
    return true;
  }

  validateEndEffectiveDate(): boolean {
    this.endEffectiveDateError = '';
    const endDate = this.toJsDate(this.endEffectiveDateTime);
    if (!endDate) return true; // Không nhập => hợp lệ
    if (isNaN(endDate.getTime())) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực không hợp lệ';
      return false;
    }
    if (endDate < new Date()) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực không được nhỏ hơn thời điểm hiện tại';
      return false;
    }
    const startDate = this.toJsDate(this.effectiveDateTime);
    if (startDate && endDate < startDate) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực phải lớn hơn hoặc bằng ngày hiệu lực';
      return false;
    }
    return true;
  }

  onSave(submitForApproval: boolean): void {
    this.submitted = true;

    if (!this.validateEffectiveDate()) {
      return;
    }

    if (!this.validateEndEffectiveDate()) {
      return;
    }

    // Nguồn duy nhất build string gửi BE — luôn đọc giá trị mới nhất của 2 biến picker
    this.form.effectiveDate = this.formatFromTuiDateTime(this.effectiveDateTime);
    this.form.endEffectiveDate = this.formatFromTuiDateTime(this.endEffectiveDateTime);
    // Nối mảng cấu phần đã chọn (multi-select) thành string trước khi build payload gửi BE
    this.form.componentCode = this.selectedComponentCodes.join(',');

    const pType = (this.form.paramType || '').trim();
    const pVal = (this.form.paramValue || '').trim();
    const pName = (this.form.paramName || '').trim();
    const pDesc = (this.form.description || '').trim();
    const compCode = typeof this.form.componentCode === 'string' ? this.form.componentCode.trim() : '';
    const effDate = (this.form.effectiveDate || '').trim();
    const endEffDate = (this.form.endEffectiveDate || '').trim();

    if (!pType || !pVal || !pName || !compCode || !effDate) {
      return;
    }

    const payload: Partial<DanhMucRow> = {
      ...this.form,
      status: submitForApproval ? 3 : 1,
      paramType: pType,
      paramValue: pVal,
      paramName: pName,
      description: pDesc,
      componentCode: compCode,
      effectiveDate: effDate,
      endEffectiveDate: endEffDate,
      newData: this.mode === 'add' ? null : (this.form.newData ?? null),
    };

    this.save.emit({
      row: payload,
      submitForApproval,
    });
  }
}

export { FormComponent as DanhMucFormComponent };