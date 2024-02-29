import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { NotLoggedInGuard } from './guards/notLoggedIn.guard';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HttpInterceptorService } from './services/http-interceptor.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotLoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
