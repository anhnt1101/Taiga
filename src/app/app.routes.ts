import { Routes } from '@angular/router';

import { DanhMucTheoNhomComponent } from './components/dashboard/danh-muc-theo-nhom/danh-muc-theo-nhom.component';
import { DanhMucFormComponent } from './components/dashboard/form/form.component';
import { LoginComponent } from './components/dashboard/login/login.component';
import { RegisterComponent } from './components/dashboard/register/register.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    children: [
      {
        path: '',
        component: DanhMucTheoNhomComponent,
      },

      {
        path: 'new',
        component: DanhMucFormComponent,
        data: { mode: 'add' },
      },

      {
        path: 'update/:id',
        component: DanhMucFormComponent,
        data: { mode: 'edit' },
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];