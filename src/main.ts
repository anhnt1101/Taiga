import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideTaiga, TUI_ASSETS_PATH } from '@taiga-ui/core';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),

    provideTaiga(),

    {
      provide: TUI_ASSETS_PATH,
      useValue: 'assets/taiga-ui/icons',
    },
  ],
}).catch((err) => console.error(err));