import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  DanhMucRow,
  DanhMucFilterParams,
  ComponentCodeOption,
  PageResponse,
  ToastAction,
} from '../models/danh-muc.model';

@Injectable({
  providedIn: 'root',
})

export class DanhMucService {
  private readonly http = inject(HttpClient);

  // API Endpoints
  private readonly apiUrl = 'http://localhost:8080/api/group-category';
  private readonly apiUrlComponent = 'http://localhost:8080/api/component-code';

  // Giữ tạm bản ghi đang sửa/sao chép để trang Form đọc khi vừa điều hướng tới (thay cho @Input trước đây)
  private readonly _editingRow = signal<DanhMucRow | null>(null);
  // Giữ tạm thông báo (toast) cần hiển thị khi quay lại trang danh sách sau khi Thêm/Sửa thành công
  private readonly _pendingToast = signal<{ row: DanhMucRow | null; action: ToastAction } | null>(null);

  /** Gọi trước khi điều hướng sang trang Sửa/Sao chép để mang theo dữ liệu bản ghi. */
  setEditingRow(row: DanhMucRow | null): void {
    this._editingRow.set(row);
  }

  /** Trang Form gọi 1 lần khi khởi tạo để lấy (và xoá) bản ghi vừa được truyền sang. */
  consumeEditingRow(): DanhMucRow | null {
    const row = this._editingRow();
    this._editingRow.set(null);
    return row;
  }

  /** Gọi trước khi điều hướng về trang danh sách để yêu cầu hiển thị toast kết quả. */
  notify(row: DanhMucRow | null, action: ToastAction): void {
    this._pendingToast.set({ row, action });
  }

  /** Trang danh sách gọi 1 lần trong ngOnInit để lấy (và xoá) toast đang chờ hiển thị. */
  consumePendingToast(): { row: DanhMucRow | null; action: ToastAction } | null {
    const pending = this._pendingToast();
    this._pendingToast.set(null);
    return pending;
  }

  private formatDateString(val: any): string {
    if (val === undefined || val === null) return '';
    if (typeof val === 'number') {
      const d = new Date(val > 10000000000 ? val : val * 1000);
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }
    const str = String(val).trim();
    if (!str) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
      const parts = str.split('T')[0].split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return str;
  }

  /**
   * Chuẩn hóa hàng dữ liệu để đảm bảo cả thuộc tính API và thuộc tính bí danh (alias) trên giao diện người dùng đều được điền đầy đủ.
   */
  public normalizeRow(row: Partial<DanhMucRow>): DanhMucRow {
    const id = Number(row.id || row.stt || Date.now());
    const stt = Number(row.stt || row.id || 1);

    const paramType = row.paramType || (row as any).loaiThamSo || (row as any).param_type || (row as any).groupCategory || '';
    const paramValue = row.paramValue || (row as any).giaTriThamSo || (row as any).param_value || (row as any).value || '';
    const paramName = row.paramName || (row as any).tenThamSo || (row as any).param_name || (row as any).name || '';
    const description = row.description || (row as any).moTa || (row as any).desc || '';

    const rawComponent =
      row.componentCode ??
      (row as any).cauPhanXuLy ??
      (row as any).cauPhanXuLuc ??
      (row as any).component_code ??
      (row as any).component;

    let componentCode = '';
    if (typeof rawComponent === 'string') {
      componentCode = rawComponent;
    } else if (Array.isArray(rawComponent)) {
      componentCode = rawComponent
        .map((item) => (typeof item === 'string' ? item : (item as ComponentCodeOption)?.componentCode || ''))
        .filter((v) => !!v)
        .join(',');
    } else if (rawComponent && typeof rawComponent === 'object') {
      componentCode = (rawComponent as ComponentCodeOption).componentCode || '';
    }

    const rawEffectiveDate =
      row.effectiveDate ?? (row as any).ngayHieuLuc ?? (row as any).effective_date ?? (row as any).fromDate ?? (row as any).startDate ?? '';
    const rawEndEffectiveDate =
      row.endEffectiveDate ?? (row as any).ngayHetHieuLuc ?? (row as any).end_effective_date ?? (row as any).toDate ?? (row as any).endDate ?? '';

    const effectiveDate = this.formatDateString(rawEffectiveDate);
    const endEffectiveDate = this.formatDateString(rawEndEffectiveDate);

    const rawStatus = row.status ?? (row as any).trangThai;
    let statusCode = 1;
    if (typeof rawStatus === 'number') {
      statusCode = rawStatus;
    } else if (typeof rawStatus === 'string' && rawStatus.trim() !== '') {
      const parsed = parseInt(rawStatus, 10);
      if (!isNaN(parsed)) {
        statusCode = parsed;
      }
    } else if (rawStatus && typeof rawStatus === 'object' && typeof (rawStatus as any).code === 'number') {
      statusCode = (rawStatus as any).code;
    }

    let activeVal = 1;
    const rawActive = row.isActive ?? (row as any).trangThaiHoatDong ?? (row as any).active;
    if (
      rawActive === 'inactive' ||
      rawActive === 0 ||
      rawActive === '0' ||
      rawActive === false ||
      rawActive === 'Không hoạt động' ||
      rawActive === 'NGUNG_HOAT_DONG'
    ) {
      activeVal = 0;
    } else {
      activeVal = 1;
    }

    const newDataVal = row.newData !== undefined ? row.newData : null;
    const isDisplayVal = row.isDisplay ?? 1;

    return {
      id,
      stt,
      paramType,
      paramValue,
      paramName,
      description,
      componentCode: componentCode,
      effectiveDate,
      endEffectiveDate,
      status: statusCode,
      isActive: activeVal,
      newData: newDataVal,
      isDisplay: isDisplayVal,
      // lyDoTuChoi: row.lyDoTuChoi,
    };
  }

  //getList component-code
  getComponentCodes(): Observable<ComponentCodeOption[]> {
    return this.http.get<ComponentCodeOption[]>(this.apiUrlComponent);
  }

  //GetList group-category
  getList(filters?: DanhMucFilterParams): Observable<PageResponse<DanhMucRow>> {
    let params = new HttpParams();
    if (filters) {
      if (filters.paramType) {
        params = params.set('paramType', filters.paramType);
      }
      if (filters.paramValue) {
        params = params.set('paramValue', filters.paramValue);
      }
      if (filters.paramName) {
        params = params.set('paramName', filters.paramName);
      }
      if (filters.status !== null && filters.status !== undefined) {
        params = params.set('status', String(filters.status));
      }
      if (filters.isActive !== null && filters.isActive !== undefined) {
        params = params.set('isActive', String(filters.isActive));
      }
      // page
      params = params.set('page', String(filters.page ?? 0));
      // size
      params = params.set('size', String(filters.size ?? 10));
    }
    return this.http
      .get<PageResponse<DanhMucRow>>(this.apiUrl, { params })
      .pipe(
        map((res) => ({
          ...res,
          content: res.content.map((item, index) => ({
            ...this.normalizeRow(item),
            stt: res.number * res.size + index + 1
          }))
        }))
      );
  }

  //Lấy chi tiết theo id — dùng khi trang Form được mở trực tiếp qua URL (F5, mở link) mà
  //không có sẵn dữ liệu truyền qua setEditingRow().
  //⚠️ Giả định endpoint theo cùng quy ước REST với delete() bên dưới — kiểm tra lại với BE nếu khác.
  getById(id: number): Observable<DanhMucRow> {
    return this.http.get<DanhMucRow>(`${this.apiUrl}/${id}`).pipe(map((res) => this.normalizeRow(res)));
  }

  //Thêm mới
  create(data: Partial<DanhMucRow>, submitForApproval: boolean): Observable<DanhMucRow> {
    const payload = {
      ...data,
      submitForApproval,
    };
    console.log(payload)

    return this.http.post<DanhMucRow>(this.apiUrl, payload).pipe(map((res) => this.normalizeRow(res)),)
  }

  //update
  update(data: Partial<DanhMucRow>, newData: Partial<DanhMucRow>, submitForApproval: boolean): Observable<DanhMucRow> {
    const payload = {
      ...newData,
      id: data.id,
      status: submitForApproval ? 3 : data.status,
      newData: JSON.stringify({
        paramType: newData.paramType,
        paramValue: newData.paramValue,
        paramName: newData.paramName,
        componentCode: newData.componentCode,
        effectiveDate: newData.effectiveDate,
        endEffectiveDate: newData.endEffectiveDate,
        description: newData.description,
      }),
      submitForApproval,
    };
    return this.http.put<DanhMucRow>(this.apiUrl, payload).pipe(map((res) => this.normalizeRow(res)),);
  }

  //Xóa danh mục (DELETE)
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  //Trình duyệt bản ghi

  submitApproval(ids: number[], status: number): Observable<DanhMucRow[]> {
    console.log(ids)

    return this.http
      .post<DanhMucRow[]>(`${this.apiUrl}/submit-approval`, { ids, status })  
    }
    


  //Phê duyệt bản ghi
  approve(ids: number[], status: number): Observable<DanhMucRow[]> {
    console.log(ids)

    return this.http
      .post<DanhMucRow[]>(`${this.apiUrl}/approve`, { ids, status })      
  }

  // Hủy duyệt bản ghi 
  cancelApprove(ids: number[], status: number): Observable<DanhMucRow[]> {
    console.log(ids)

    return this.http
      .post<DanhMucRow[]>(`${this.apiUrl}/cancel-approve`, { ids, status })
  }

  //Từ chối duyệt bản ghi 
  reject(ids: number[], status: number): Observable<DanhMucRow[]> {
    console.log(ids)

    return this.http
      .post<DanhMucRow[]>(`${this.apiUrl}/reject`, { ids, status })
  }

  //tìm kiếm
  search(filters: DanhMucFilterParams): Observable<PageResponse<DanhMucRow>> {
    return this.http.post<PageResponse<DanhMucRow>>(`${this.apiUrl}/search`, filters);
  }

  exportAll(filters: DanhMucFilterParams): Observable<HttpResponse<Blob>> {
    return this.http.post(
      `${this.apiUrl}/exportAll`, filters, { observe: 'response', responseType: 'blob' }
    );

  }

  connectChangeEvent(): Observable<MessageEvent> {
  return new Observable(observer => {
    const eventSource = new EventSource(
      'http://localhost:8080/api/group-category/events'
    );

    eventSource.addEventListener('group-category-changed', event => {
      observer.next(event as MessageEvent);
    });

    eventSource.onerror = error => {
      console.warn('SSE connection lost:', error);
    };

    return () => {
      eventSource.close();
    };
  });
}

}

