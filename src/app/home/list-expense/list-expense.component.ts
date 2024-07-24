import { Component, OnInit } from '@angular/core';
import { ExpenseTableData } from 'src/app/core/interfaces/interface';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css']
})
export class ListExpenseComponent implements OnInit {

   // Will be from API:
   public expenseTableData: ExpenseTableData = {
    limit: 10,
    title: "All Expense",
    data: [
      {
        name: "Tea",
        category: "Drink",
        mode: "Cash",
        amount: 10
      },
      {
        name: "Metro",
        category: "Metro Pass",
        mode: "GPAY",
        amount: 500
      },
      {
        name: "MilkyBar",
        category: "Snack",
        mode: "Cash",
        amount: 10
      },{
        name: "My Phone",
        category: "Recharge",
        mode: "GPAY",
        amount: 209.09
      }
      ,{
        name: "Tea",
        category: "Drink",
        mode: "Cash",
        amount: 10
      },
      {
        name: "Bike Parking",
        category: "Parking",
        mode: "Cash",
        amount: 20
      },
      {
        name: "Brinch",
        category: "Food",
        mode: "Cash",
        amount: 50
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
