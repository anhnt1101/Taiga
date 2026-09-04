import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

interface SubmenuItem {
  label: string;
  fullLabel?: string;
  active?: boolean;
}

@Component({
  selector: 'ph-submenu',
  standalone: true,

  imports: [
    CommonModule,
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,

  templateUrl:
    './submenu.component.html',

  styleUrl:
    './submenu.component.scss',
})
export class SubmenuComponent {

  /**
   * Mặc định thu gọn.
   */
  readonly collapsed =
    signal<boolean>(true);


  /**
   * Gắn class trực tiếp lên:
   *
   * <ph-submenu>
   *
   * Khi mở:
   * <ph-submenu class="submenu-expanded">
   */
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

    {
      label:
        'Tham số danh mục theo n...',

      fullLabel:
        'Tham số danh mục theo nhóm',

      active: true,
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