import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';
import { UserShellComponent } from './user-shell.component';

export const USER_SHELL_ROUTES: Route[] = [
  {
    path: '',
    providers: [provideToken('user-token')],
    component: UserShellComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/home').then(
            (m) => m.USER_HOME_ROUTES,
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact').then(
            (m) => m.CONTACT_ROUTES,
          ),
      },
    ],
  },
];
