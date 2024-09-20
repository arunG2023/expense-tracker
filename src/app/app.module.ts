import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SnackBarComponent } from "./core/components/snack-bar/snack-bar.component";
import { HomeComponent } from './home/home/home.component';
import { NavigationModule } from './core/modules/navigation/navigation/navigation.module';
import { ApiErrorInterceptor } from './core/interceptors/api-error.interceptor';
import { ApiHeaderInterceptor } from './core/interceptors/api-header.interceptor';
import { LoadingSpinnerComponent } from "./core/components/loading-spinner/loading-spinner.component";
import { DialogBoxComponent } from "./core/components/dialog-box/dialog-box.component";
import { ProfilePageComponent } from "./core/components/profile-page/profile-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SnackBarComponent,
    NavigationModule,
    LoadingSpinnerComponent,
    DialogBoxComponent,
    ProfilePageComponent
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
