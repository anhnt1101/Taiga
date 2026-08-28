import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';

import { filter } from 'rxjs';

import { TuiRoot } from '@taiga-ui/core';

import { HeaderComponent } from './components/layout/header/header.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { SubmenuComponent } from './components/layout/submenu/submenu.component';

@Component({
  selector: 'ph-root',
  standalone: true,

  imports: [
    TuiRoot,
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    SubmenuComponent,
  ],

  changeDetection:
    ChangeDetectionStrategy.OnPush,

  template: `
    <tui-root>

      @if (isAuthPage) {

        <!-- LOGIN / REGISTER - FULL SCREEN -->
        <router-outlet />

      } @else {

        <!-- DASHBOARD LAYOUT -->
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

      }

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
export class AppComponent {

  private readonly router =
    inject(Router);

  isAuthPage =
    this.checkAuthPage(
      this.router.url
    );

  constructor() {

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {

        this.isAuthPage =
          this.checkAuthPage(
            event.urlAfterRedirects
          );

      });
  }

  private checkAuthPage(
    url: string
  ): boolean {

    return (
      url === '/login' ||
      url === '/register'
    );
  }
}