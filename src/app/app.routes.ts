import { Routes } from '@angular/router';
import { DanhMucTheoNhomComponent } from './components/dashboard/danh-muc-theo-nhom/danh-muc-theo-nhom.component';
import { DanhMucFormComponent } from './components/dashboard/form/form.component';

export const routes: Routes = [
  {
    path: 'danh-muc-theo-nhom',
    children: [
      { path: '', component: DanhMucTheoNhomComponent },
      { path: 'them-moi', component: DanhMucFormComponent, data: { mode: 'add' } },
      { path: 'sao-chep/:id', component: DanhMucFormComponent, data: { mode: 'add' } },
      { path: 'sua/:id', component: DanhMucFormComponent, data: { mode: 'edit' } },
    ],
  },
  // ... các route khác của bạn giữ nguyên
];