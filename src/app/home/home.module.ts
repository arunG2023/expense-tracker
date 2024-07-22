import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationModule } from '../core/modules/navigation/navigation/navigation.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ListExpenseComponent } from './list-expense/list-expense.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddExpenseComponent,
    ListExpenseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
