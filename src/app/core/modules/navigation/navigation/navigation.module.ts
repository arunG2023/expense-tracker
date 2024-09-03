import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ProfileBarComponent } from './profile-bar/profile-bar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ProfileBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    ProfileBarComponent
  ]
})
export class NavigationModule { }
