import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiRoot } from '@taiga-ui/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { SubmenuComponent } from './components/layout/submenu/submenu.component';
import { DanhMucTheoNhomComponent } from './components/dashboard/danh-muc-theo-nhom/danh-muc-theo-nhom.component';

@Component({
  selector: 'ph-root',
  standalone: true,
  imports: [TuiRoot, HeaderComponent, MenuComponent, SubmenuComponent, DanhMucTheoNhomComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tui-root>
      <div class="shell">
        <ph-menu />
        <ph-submenu />
        <div class="shell__main">
          <ph-header />
          <main class="shell__content">
            <ph-danh-muc-theo-nhom />
          </main>
        </div>
      </div>
    </tui-root>
  `,
  styles: [
    `
      .shell {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }
      .shell__main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .shell__content {
        flex: 1;
        overflow-y: auto;
        padding: 20px 28px 32px;
      }
    `,
  ],
})
export class AppComponent {}
