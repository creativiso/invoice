import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';
//import { AuthInterceptor } from './auth/auth.interceptor';
import { NotLoggedInGuard } from './auth/notLoggedIn.guard';
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
          canActivate: [AuthGuard],
        },
        {
          path: 'invoices/:id/items/:id/edit',
          loadChildren: () =>
            import('./modules/invoices/invoices.module').then(
              (m) => m.InvoicesModule
            ),
          canActivate: [AuthGuard],
        },
        {
          path: 'invoicesList',
          loadChildren: () =>
            import('./modules/invoicesList/invoicesList.module').then(
              (m) => m.InvoicesListModule
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
            import('./modules/profile/profile.module').then(
              (m) => m.ProfileModule
            ),
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
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard, NotLoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
