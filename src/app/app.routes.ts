import { Routes } from '@angular/router';
import { DanhMucTheoNhomComponent } from './components/dashboard/danh-muc-theo-nhom/danh-muc-theo-nhom.component';
import { DanhMucFormComponent } from './components/dashboard/form/form.component';

export const routes: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
  {
    
    path: '',
    children: [
      { path: '', component: DanhMucTheoNhomComponent },
      { path: 'new', component: DanhMucFormComponent, data: { mode: 'add' } },
      { path: 'new', component: DanhMucFormComponent, data: { mode: 'add' } },
      { path: 'update/:id', component: DanhMucFormComponent, data: { mode: 'edit' } },
    ],
  },
  // ... các route khác của bạn giữ nguyên
];