import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationModule } from '../core/modules/navigation/navigation/navigation.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ListExpenseComponent } from './list-expense/list-expense.component';
import { RoundPipe } from '../core/pipes/round.pipe';
import { ExpenseTableComponent } from '../core/components/expense-table/expense-table.component';
import { LoadingSpinnerComponent } from "../core/components/loading-spinner/loading-spinner.component";
import { FormsModule } from '@angular/forms';
import { AddExpenseFormComponent } from '../core/components/add-expense-form/add-expense-form.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddExpenseComponent,
    ListExpenseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RoundPipe,
    ExpenseTableComponent,
    LoadingSpinnerComponent,
    FormsModule,
    AddExpenseFormComponent
]
})
export class HomeModule { }
