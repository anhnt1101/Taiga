export type StatusTone = 'success' | 'new' | 'pending' | 'rejected' | 'canceled';

export interface StatusValue {
  code: number;
  text: string;
  tone: StatusTone;
}

export interface ComponentCodeOption {
  id: number;
  componentCode: string;
}

export interface DanhMucRow {
  id: number;
  stt: number;
  paramType: string;
  paramValue: string;
  paramName: string;
  description: string;
  componentCode: string;
  effectiveDate: string;
  endEffectiveDate: string;
  status: number;
  isActive: number;
  newData: Partial<DanhMucRow> | null;
  isDisplay: number;
  lyDoTuChoi?: string;

}

export interface DanhMucFilterParams {
  page?: number;
  size?: number;
  paramType?: string;
  paramValue?: string;
  paramName?: string;
  status?: number | null;
  isActive?: number | null;
}

export interface PageResponse<T> {

  content: T[];

  totalElements: number;

  totalPages: number;

  size: number;

  number: number;

}

export const DANH_MUC_OPTIONS = ['Điều chỉnh thông tin', 'Hoàn trả'];

export const STATUS_OPTIONS: StatusValue[] = [
  { code: 1, text: 'Mới', tone: 'new' },
  { code: 3, text: 'Chờ duyệt', tone: 'pending' },
  { code: 4, text: 'Đã duyệt', tone: 'success' },
  { code: 5, text: 'Từ chối', tone: 'rejected' },
  { code: 7, text: 'Hủy duyệt', tone: 'canceled' },
];

