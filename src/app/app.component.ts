import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { HeaderComponent } from './components/layout/header/header.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { SubmenuComponent } from './components/layout/submenu/submenu.component';

@Component({
  selector: 'ph-root',
  standalone: true,
  imports: [TuiRoot, RouterOutlet, HeaderComponent, MenuComponent, SubmenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tui-root>
      <div class="shell">
        <ph-menu />
        <ph-submenu />
        <div class="shell__main">
          <ph-header />
          <main class="shell__content">
            <router-outlet />
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
