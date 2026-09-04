import {
  Routes,
} from '@angular/router';

import {
  DanhMucTheoNhomComponent,
} from './components/dashboard/danh-muc-theo-nhom/danh-muc-theo-nhom.component';

import {
  DanhMucFormComponent,
} from './components/dashboard/form/form.component';

import {
  LoginComponent,
} from './components/dashboard/login/login.component';

import {
  RegisterComponent,
} from './components/dashboard/register/register.component';

import {
  authGuard,
} from './guards/auth.guard';

import {
  roleGuard,
} from './guards/role.guard';


export const routes: Routes = [

  /**
   * ===============================
   * PUBLIC ROUTES
   * ===============================
   */

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },


  /**
   * ===============================
   * PRIVATE ROUTES
   * ===============================
   */

  {
    path: '',

    canActivate: [
      authGuard,
    ],

    children: [

      /**
       * Danh sách
       */
      {
        path: '',

        component:
          DanhMucTheoNhomComponent,
          
      },

      {
        path: 'new',

        component:
          DanhMucFormComponent,

        canActivate: [
          roleGuard,
        ],

        data: {
          mode: 'add',

          roles: [
            'ROLE_ADMIN',
            'ROLE_MAKER',
          ],
        },
      },

      {
        path: 'update/:id',

        component:
          DanhMucFormComponent,

        canActivate: [
          roleGuard,
        ],

        data: {
          mode: 'edit',

          roles: [
            'ROLE_ADMIN',
            'ROLE_MAKER',
          ],
        },
      },

    ],
  },


  /**
   * ===============================
   * NOT FOUND
   * ===============================
   */

  {
    path: '**',
    redirectTo: 'login',
  },

];