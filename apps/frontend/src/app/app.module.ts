import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './services/auth.service';
import { NotLoggedInGuard } from './auth/notLoggedIn.guard';
import { MatRippleModule } from '@angular/material/core';
import { AppRoutingModule } from './appRouting.module';
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, NavigationComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatIconModule,
    MatRippleModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthService, AuthGuard, NotLoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
