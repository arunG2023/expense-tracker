import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RouteGuardGuard } from '../core/route-guard/route-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routesConfig } from '../core/config/routes-config';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ListExpenseComponent } from './list-expense/list-expense.component';

const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: routesConfig.DASHBOARD,
    pathMatch: 'full'
  },
  {
    path: routesConfig.DASHBOARD,
    component: DashboardComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: routesConfig.ADD_EXPENSE,
    component: AddExpenseComponent,
    canActivate: [RouteGuardGuard]
  },
  {
    path: routesConfig.LIST_ALL_EXPENSE,
    component: ListExpenseComponent,
    canActivate: [RouteGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
