import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouteGuardGuard } from '../core/route-guard/route-guard.guard';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [RouteGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }