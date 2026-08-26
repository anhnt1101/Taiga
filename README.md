# Payment Hub — Tham số danh mục theo nhóm

Bản dựng lại giao diện trong ảnh, dùng **Angular 19 (standalone components)**, **Taiga UI v4** cho các control cơ bản (nút bấm, root theme) và **AG Grid (ag-grid-angular)** cho bảng dữ liệu.

## Yêu cầu môi trường

- **Node.js 24.x** (hoặc tối thiểu 20.19+ / 22.12+) — tương thích với Angular CLI 19.
- npm 10+

## Cài đặt

```bash
cd payment-hub
npm install
npm start
```

Ứng dụng chạy tại `http://localhost:4200`.

## Cấu trúc thư mục

```
src/
  app/
    app.component.ts                 # Shell: rail icon + sidebar + header + nội dung
    core/layout/
      header/header.component.ts     # Thanh trên cùng: logo, chuông, ngôn ngữ, avatar
      sidebar/icon-rail.component.ts # Dải icon xanh đậm ngoài cùng bên trái
      sidebar/sidebar.component.ts   # Panel menu văn bản (Tham số, Kênh thanh toán...)
    pages/danh-muc-theo-nhom/
      danh-muc-theo-nhom.component.ts/html/scss   # Trang chính: filter + bảng
      status-cell.component.ts       # Cell renderer trạng thái (chấm màu) cho AG Grid
  styles.scss                        # Design tokens (màu, radius...) + override theme AG Grid
```

## Ghi chú triển khai

- **Dữ liệu**: trang đang dùng dữ liệu mock 100 dòng sinh sẵn trong `danh-muc-theo-nhom.component.ts` (hàm `buildMockRows`). Thay bằng gọi API thật ở `search()` / `ngOnInit`.
- **Bộ lọc**: các input/select đã bind hai chiều qua `ngModel`, hàm `search()` và `clearFilters()` là chỗ để nối vào API.
- **Xuất Excel**: nút `Xuất Excel` gọi `exportExcel()` — hiện là placeholder, có thể export CSV phía client hoặc gọi endpoint export phía server.
- **AG Grid**: dùng theme `ag-theme-quartz` (class-based, custom hoá qua biến CSS `--ag-*` trong `styles.scss`, namespace `.ph-grid`) để khớp màu sắc, khoảng cách với ảnh gốc. Đã ghim `ag-grid-community`/`ag-grid-angular` ở bản `^32.x` vì đây là bản ổn định cuối cùng dùng theme kiểu class + CSS variables — nếu nâng lên v33+ (Theming API mới), cần bỏ 2 dòng import css trong `angular.json` và chuyển sang cấu hình `theme` bằng JS theo tài liệu AG Grid mới nhất.
- **Taiga UI**: `TuiRoot` bọc toàn bộ shell trong `app.component.ts`, các nút hành động dùng directive `tuiButton`. Đây mới là tích hợp ở mức nền tảng (root + button) để đảm bảo build ổn định; các trường input/select trong bộ lọc hiện dùng HTML thuần để tránh phụ thuộc vào API `tuiTextfield`/`tuiSelect` có thể thay đổi giữa các bản Taiga UI — bạn có thể thay bằng component Taiga tương ứng theo tài liệu chính thức (https://taiga-ui.dev) nếu muốn đồng bộ 100% style input.
- **Icon**: icon ở rail/sidebar/breadcrumb là SVG inline tự vẽ (đường nét đơn giản), không phụ thuộc icon font, để không cần cấu hình thêm asset.

## Vì sao chưa `npm install` sẵn

Môi trường tạo project này không có kết nối mạng ra ngoài, nên chưa chạy được `npm install` để tải Angular CLI/Taiga UI/AG Grid và build thử. Sau khi cài đặt ở máy bạn, nếu gặp lỗi biên dịch nhỏ do khác version Taiga UI/AG Grid (API đổi tên input/class giữa các minor version), thường chỉ cần chỉnh lại tên input tương ứng theo gợi ý lỗi TypeScript — cấu trúc component/service không đổi.
