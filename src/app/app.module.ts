import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarComponent } from "./core/components/snack-bar/snack-bar.component";
import { HomeComponent } from './home/home/home.component';
import { NavigationModule } from './core/modules/navigation/navigation/navigation.module';

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
    NavigationModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
