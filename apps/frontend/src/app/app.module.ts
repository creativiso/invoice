import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, NavigationComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'invoices',
          loadChildren: () =>
            import('./modules/invoices/invoices.module').then(
              (m) => m.InvoicesModule
            ),
        },
        {
          path: 'proformas',
          loadChildren: () =>
            import('./modules/proformas/proformas.module').then(
              (m) => m.ProformasModule
            ),
        },
        {
          path: 'contractors',
          loadChildren: () =>
            import('./modules/contractors/contractors.module').then(
              (m) => m.ContractorsModule
            ),
        },
        {
          path: 'settings',
          loadChildren: () =>
            import('./modules/settings/settings.module').then(
              (m) => m.SettingsModule
            ),
        },
        {
          path: 'users',
          loadChildren: () =>
            import('./modules/users/users.module').then((m) => m.UsersModule),
        },
        {
          path: 'profile',
          loadChildren: () =>
            import('./modules/profile/profile.module').then(
              (m) => m.ProfileModule
            ),
        },
        {
          path: 'login',
          loadChildren: () =>
            import('./modules/login/login.module').then((m) => m.LoginModule),
        },
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then(
              (m) => m.DashboardModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
