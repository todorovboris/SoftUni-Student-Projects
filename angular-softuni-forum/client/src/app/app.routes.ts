import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/shared/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'themes',
    loadComponent: () =>
      import('./components/themes/themes-list/themes-list.component').then(
        (c) => c.ThemesListComponent
      ),
  },
  {
    path: 'create-theme',
    loadComponent: () =>
      import('./components/themes/create-theme/create-theme.component').then(
        (c) => c.CreateThemeComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
