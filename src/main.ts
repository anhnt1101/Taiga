import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTaiga, TUI_ASSETS_PATH } from '@taiga-ui/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    provideRouter(routes),
    provideTaiga(),

    {
      provide: TUI_ASSETS_PATH,
      useValue: 'assets/taiga-ui/icons',
    },
  ],
}).catch((err) => console.error(err));