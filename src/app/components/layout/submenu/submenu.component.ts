import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

interface SubmenuItem {
  label: string;
  fullLabel?: string;

  // Có route thì item có thể chuyển trang
  route?: string;
}

@Component({
  selector: 'ph-submenu',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,

  templateUrl:
    '/submenu.component.html',

  styleUrl:
    './submenu.component.scss',
})
export class SubmenuComponent {

  /**
   * Mặc định thu gọn.
   */
  readonly collapsed =
    signal<boolean>(true);

  @HostBinding(
    'class.submenu-expanded'
  )
  get expanded(): boolean {
    return !this.collapsed();
  }

  readonly items: SubmenuItem[] = [

    {
      label: 'Cấu phần xử lý',
    },

    /**
     * Trang hiện tại:
     * Tham số danh mục theo nhóm
     */
    {
      label:
        'Tham số danh mục theo n...',

      fullLabel:
        'Tham số danh mục theo nhóm',

      route: '/',
    },

    /**
     * Trang mới
     */
    {
      label:
        'Transaction Log',

      fullLabel:
        'Transaction Log',

      route:
        '/transaction-log',
    },

    {
      label:
        'Kênh thanh toán',
    },

    {
      label:
        'Mã loại điện tra soát',
    },

    {
      label:
        'Tiêu chí dừng phân kênh t...',

      fullLabel:
        'Tiêu chí dừng phân kênh thanh toán',
    },

    {
      label:
        'Tạm dừng phân kênh',
    },

    {
      label:
        'Cấu hình định tuyến kênh...',

      fullLabel:
        'Cấu hình định tuyến kênh thanh toán',
    },

    {
      label:
        'Kênh phân phối/ứng dụng',
    },

    {
      label:
        'Tiêu chí chấm điểm cho k...',

      fullLabel:
        'Tiêu chí chấm điểm cho kênh',
    },
  ];

  togglePanel(): void {
    this.collapsed.update(
      value => !value
    );
  }
}

export {
  SubmenuComponent as SidebarComponent,
};