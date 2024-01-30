import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotLoggedInGuard } from './auth/notLoggedIn.guard';

const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () =>
      import('./modules/invoices/invoices.module').then(
        (m) => m.InvoicesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'proformas',
    loadChildren: () =>
      import('./modules/proformas/proformas.module').then(
        (m) => m.ProformasModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'contractors',
    loadChildren: () =>
      import('./modules/contractors/contractors.module').then(
        (m) => m.ContractorsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [NotLoggedInGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
