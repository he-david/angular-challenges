import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from 'libs/module-to-standalone/shell/src/lib/main-shell.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideToken('main-shell-token'), provideRouter(APP_ROUTES)],
});
