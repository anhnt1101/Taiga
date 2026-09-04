import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, inject, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton, TuiCalendar, TuiDropdown, TuiInput, TuiTextfield, } from '@taiga-ui/core';
import { TuiChevron, TuiInputDateTime, TuiMultiSelect, } from '@taiga-ui/kit'
import { TuiDay, TuiTime, } from '@taiga-ui/cdk';
import { ComponentCodeOption, DanhMucRow, } from '../../../models/danh-muc.model';
import { DanhMucService, } from '../../../services/danh-muc.service';
import { HasRoleDirective, } from '../../../directives/has-role.directive';

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
    TuiMultiSelect,
    HasRoleDirective
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  private readonly danhMucService = inject(DanhMucService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  mode: 'add' | 'edit' = 'add';

  /**
   * Bản ghi gốc dùng khi update.
   * null nếu đang thêm mới.
   */
  private originalRow: DanhMucRow | null = null;

  readonly duplicateFields = signal({
    paramValue: false,
    paramType: false,
    effectiveDate: false,
    endEffectiveDate: false,
  });

  readonly duplicateErrorMessage = signal('');
  submitted = false;

  /**
   * Multi select cấu phần xử lý
   */
  componentCodeItems: string[] = [];
  selectedComponentCodes: string[] = [];

  /**
   * Validation ngày
   */
  effectiveDateError = '';
  endEffectiveDateError = '';

  /**
   * Giá trị Taiga date/time
   */
  effectiveDateTime: [TuiDay, TuiTime] | null = null;
  endEffectiveDateTime: [TuiDay, TuiTime] | null = null;

  /**
   * Trạng thái dropdown calendar
   */
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
    this.mode = (this.route.snapshot.data['mode'] as | 'add' | 'edit') || 'add';

    /**
     * Lấy dữ liệu từ service nếu đi từ màn danh sách.
     */
    const passedRow = this.danhMucService.consumeEditingRow();
    if (passedRow) {
      this.applyInitialData(passedRow);
    } else {
      /**
       * Nếu F5 hoặc mở trực tiếp URL edit
       * thì load lại bằng ID.
       */
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.danhMucService.getById(Number(id)).subscribe({
          next: (row) => {
            this.applyInitialData(row);
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error(
              'Không tải được dữ liệu bản ghi:',
              err
            );
          },
        });
      }
    }

    /**
     * Load danh sách cấu phần xử lý
     */
    this.danhMucService
      .getComponentCodes()
      .subscribe({
        next: (options) => {

          const codes =
            (options ?? [])
              .map(
                option =>
                  option?.componentCode
              )
              .filter(
                (code): code is string =>
                  !!code
              );

          this.componentCodeItems = [
            ...new Set([
              ...this.componentCodeItems,
              ...codes,
            ]),
          ];

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

  /**
   * Gán dữ liệu khi Edit / Copy.
   */
  private applyInitialData(initialData: DanhMucRow): void {
    this.originalRow = initialData;

    const dataToLoad = {
      ...initialData,
    };

    /**
     * Nếu có newData thì ưu tiên dữ liệu mới.
     */
    const newData = initialData.newData;

    if (newData && typeof newData === 'object'
    ) {
      Object.assign(dataToLoad, newData);
    } else if (
      typeof newData === 'string'
    ) {
      try {
        const parsed = JSON.parse(newData);
        if (
          parsed &&
          typeof parsed === 'object'
        ) {
          Object.assign(dataToLoad, parsed);
        }
      } catch {
        // newData không phải JSON hợp lệ
      }
    }

    const pType = dataToLoad.paramType || '';
    const pVal = dataToLoad.paramValue || '';
    const pName = dataToLoad.paramName || '';
    const pDesc = dataToLoad.description || '';

    /**
     * Xử lý componentCode từ BE.
     *
     * BE có thể trả:
     * - string
     * - array
     * - object
     */
    let compCodeStr = '';

    let compCodesArr: string[] = [];

    const rawComp = dataToLoad.componentCode || (dataToLoad as any).cauPhanXuLy;

    if (Array.isArray(rawComp)) {
      compCodesArr = rawComp
        .map((item) => {
          if (
            typeof item === 'string'
          ) {
            return item;
          }
          return (
            (
              item as ComponentCodeOption
            )?.componentCode || ''
          );
        })
        .filter(
          (value) => !!value
        );

      compCodeStr = compCodesArr.join(',');
    } else if (
      typeof rawComp === 'string'
    ) {
      compCodeStr = rawComp;
      compCodesArr = rawComp.split(',').map((value) => value.trim()).filter((value) => !!value);
    } else if (
      rawComp && typeof rawComp === 'object'
    ) {
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
      componentCode:
        compCodeStr,
      effectiveDate:
        effDate,
      endEffectiveDate:
        endEffDate,
      isActive:
        activeVal,
    };

    /**
     * Đồng bộ MultiSelect
     */
    this.selectedComponentCodes = compCodesArr;

    /**
     * Đồng bộ DateTime
     */
    this.effectiveDateTime = this.parseToTuiDateTime(effDate);
    this.endEffectiveDateTime = this.parseToTuiDateTime(endEffDate);

    /**
     * Nếu route add nhưng có dữ liệu
     * thì đây có thể là thao tác sao chép.
     */
    if (this.mode === 'add') {
      delete this.form.id;
      delete this.form.stt;
      this.form.status = 1;
      this.form.isActive = 1;
    }

    /**
     * Nếu code cũ không còn trong API
     * vẫn thêm vào để Edit hiển thị được.
     */
    this.componentCodeItems = [...new Set([...this.componentCodeItems, ...compCodesArr,]),];
  }

  /**
   * Khi MultiSelect thay đổi.
   */
  onComponentCodesChange(): void {
    this.form.componentCode = this.selectedComponentCodes.join(',');
  }


  /**
   * Khi input Ngày hiệu lực thay đổi.
   */
  onEffectiveDateChange(): void {
    this.clearDuplicate('effectiveDate');

    this.form.effectiveDate = this.formatFromTuiDateTime(this.effectiveDateTime);

    this.validateEffectiveDate();
  }


  /**
   * Khi input Ngày hết hiệu lực thay đổi.
   */
  onEndEffectiveDateChange(): void {
    this.clearDuplicate('endEffectiveDate');

    this.form.endEffectiveDate = this.formatFromTuiDateTime(this.endEffectiveDateTime);

    this.validateEndEffectiveDate();
  }

  /**
   * Click ngày trong calendar
   * Ngày hiệu lực.
   */
  onEffectiveDayClick(day: TuiDay): void {
    const now = new Date();

    const time = this.effectiveDateTime?.[1] ?? new TuiTime(now.getHours(), now.getMinutes());

    this.effectiveDateTime = [day, time,];

    this.onEffectiveDateChange();

    this.isEffectiveCalendarOpen = false;
  }


  /**
   * Click ngày trong calendar
   * Ngày hết hiệu lực.
   */
  onEndEffectiveDayClick(day: TuiDay): void {

    const now = new Date();

    const time = this.endEffectiveDateTime?.[1] ?? new TuiTime(now.getHours(), now.getMinutes());

    this.endEffectiveDateTime = [day, time,];

    this.onEndEffectiveDateChange();

    this.isEndEffectiveCalendarOpen = false;
  }


  /**
   * "dd/MM/yyyy HH:mm"
   * ->
   * [TuiDay, TuiTime]
   */
  private parseToTuiDateTime(raw: string | null | undefined): [TuiDay, TuiTime] | null {

    if (!raw) {
      return null;
    }

    const [datePart, timePart,] = raw.trim().split(' ');

    const dateSegs = datePart?.split('/').map(Number);

    if (!dateSegs || dateSegs.length !== 3 || dateSegs.some(isNaN)) {
      return null;
    }

    const [dd, mm, yyyy,] = dateSegs;

    let hh = 0;
    let mi = 0;

    if (timePart) {
      const timeSegs = timePart.split(':').map(Number);

      hh = timeSegs[0] || 0; mi = timeSegs[1] || 0;
    }

    return [new TuiDay(yyyy, mm - 1, dd), new TuiTime(hh, mi),];
  }

  /**
   * [TuiDay, TuiTime]
   * ->
   * "dd/MM/yyyy HH:mm"
   */
  private formatFromTuiDateTime(value: [TuiDay, TuiTime] | null): string {

    if (!value || !value[0] || !value[1]) {
      return '';
    }


    const [day, time,] = value;


    const dd = String(day.day).padStart(2, '0');

    const mm = String(day.month + 1).padStart(2, '0');

    const yyyy = day.year;

    const hh = String(time.hours).padStart(2, '0');

    const mi = String(time.minutes).padStart(2, '0');

    return (`${dd}/${mm}/${yyyy} ` + `${hh}:${mi}`);
  }


  /**
   * Quay về màn danh sách.
   */
  onCancel(): void {
    void this.router.navigate(['/',]);
  }

  /**
   * Kiểm tra field bắt buộc.
   */
  isFieldInvalid(fieldName: keyof DanhMucRow): boolean {
    if (!this.submitted) {
      return false;
    }

    if (fieldName === 'componentCode'
    ) {
      return (this.selectedComponentCodes.length === 0);
    }

    const value = this.form[fieldName];

    return (value === null || value === undefined || value === '' || (typeof value === 'string' && value.trim() === ''));
  }


  /**
   * Xóa trạng thái duplicate
   * khi người dùng chỉnh field.
   */
  clearDuplicate(
    field: 'paramValue' | 'paramType' | 'effectiveDate' | 'endEffectiveDate'
  ): void {
    this.duplicateFields.update(current => ({
      ...current, [field]: false,
    }));
    this.duplicateErrorMessage.set('');
  }

  /**
   * Convert Taiga datetime
   * sang JavaScript Date.
   */
  private toJsDate(
    value: [TuiDay, TuiTime] | null): Date | null {
    if (!value || !value[0] || !value[1]) {
      return null;
    }

    const [day, time,] = value;

    return new Date(day.year, day.month, day.day, time.hours, time.minutes, 0, 0);
  }

  /**
   * Thời điểm hiện tại
   * bỏ giây và millisecond.
   *
   * Vì UI chỉ nhập đến phút.
   */
  private currentMinute(): Date {
    const now = new Date();
    now.setSeconds(0, 0);
    return now;
  }

  // Validate Ngày hiệu lực.
  validateEffectiveDate(): boolean {

    this.effectiveDateError = '';

    const inputDate = this.toJsDate(this.effectiveDateTime);

    if (!inputDate) {
      this.effectiveDateError = 'Ngày hiệu lực không được để trống.';
      return false;
    }

    if (isNaN(inputDate.getTime())) {
      this.effectiveDateError = 'Ngày hiệu lực không hợp lệ.';
      return false;
    }

    if (inputDate < this.currentMinute()) {
      this.effectiveDateError = 'Ngày hiệu lực không được nhỏ hơn thời điểm hiện tại.';
      return false;
    }
    return true;
  }

  //Validate Ngày hết hiệu lực.
  validateEndEffectiveDate(): boolean {

    this.endEffectiveDateError = '';
    const endDate = this.toJsDate(this.endEffectiveDateTime);

    /**
     * Không nhập ngày hết hiệu lực
     * vẫn hợp lệ.
     */
    if (!endDate) {
      return true;
    }

    if (isNaN(endDate.getTime())) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực không hợp lệ.';
      return false;
    }

    if (endDate < this.currentMinute()) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực không được nhỏ hơn thời điểm hiện tại.';
      return false;
    }

    const startDate = this.toJsDate(this.effectiveDateTime);

    if (startDate && endDate < startDate) {
      this.endEffectiveDateError = 'Ngày hết hiệu lực phải lớn hơn hoặc bằng ngày hiệu lực.';
      return false;
    }
    return true;
  }

  //Lưu / Lưu và gửi duyệt.
  onSave(submitForApproval: boolean): void {
    this.submitted = true;
    // Xóa trạng thái lỗi trùng cũ trước mỗi lần lưu.
    this.duplicateFields.set({
      paramValue: false,
      paramType: false,
      effectiveDate: false,
      endEffectiveDate: false,
    });
    this.duplicateErrorMessage.set('');

    //Đồng bộ component code.
    this.form.componentCode = this.selectedComponentCodes.join(',');

    // Đồng bộ date.
    this.form.effectiveDate = this.formatFromTuiDateTime(this.effectiveDateTime);

    this.form.endEffectiveDate = this.formatFromTuiDateTime(this.endEffectiveDateTime);

    //Validate required. 
    const pType = (this.form.paramType || '').trim();
    const pVal = (this.form.paramValue || '').trim();
    const pName = (this.form.paramName || '').trim();
    const pDesc = (this.form.description || '').trim();
    const compCode = typeof this.form.componentCode === 'string' ? this.form.componentCode.trim() : '';
    const effDate = (this.form.effectiveDate || '').trim();
    const endEffDate = (this.form.endEffectiveDate || '').trim();

    //Validate ngày.
    const effectiveValid = this.validateEffectiveDate();
    const endEffectiveValid = this.validateEndEffectiveDate();

    if (
      !pType ||
      !pVal ||
      !pName ||
      !compCode ||
      !effDate ||
      !effectiveValid ||
      !endEffectiveValid
    ) {
      return;
    }

    const payload: Partial<DanhMucRow> = {
      ...this.form,
      status: submitForApproval ? 3 : 1,
      paramType:
        pType,
      paramValue:
        pVal,
      paramName:
        pName,
      description:
        pDesc,
      componentCode:
        compCode,
      effectiveDate:
        effDate,
      endEffectiveDate:
        endEffDate,
      newData:
        this.mode === 'add'
          ? null
          : (
            this.form.newData ??
            null
          ),
    };

    if (this.mode === 'add') {
      this.danhMucService
        .create(payload, submitForApproval)
        .subscribe({
          next: (newRow) => {
            this.danhMucService
              .notify(
                newRow,
                'add'
              );
            void this.router
              .navigate([
                '/',
              ]);
          },
          error: (err) => {
            this.handleDuplicateError(
              err
            );
          },
        });
      return;
    }

    if (this.mode === 'edit' && this.originalRow) {
      this.danhMucService
        .update(
          this.originalRow,
          payload,
          submitForApproval
        )
        .subscribe({
          next: (newRow) => {
            this.danhMucService
              .notify(
                newRow,
                'edit'
              );
            void this.router
              .navigate([
                '/',
              ]);
          },
          error: (err) => {
            this.handleDuplicateError(
              err
            );
          },
        });
    }
  }

  // Backend trả 409 khi trùng dữ liệu.
  handleDuplicateError(err: any): void {
    if (err.status !== 403) {
      return;
    }
    // tham gia điều kiện kiểm tra trùng.
    this.duplicateFields.set({
      paramValue: true,
      paramType: true,
      effectiveDate: true,
      endEffectiveDate: true,
    });
    this.duplicateErrorMessage.set(
      err.error?.detail ||
      err.error?.message ||
      'Dữ liệu đã tồn tại!'
    );
  }
}


export {
  FormComponent as DanhMucFormComponent,
};