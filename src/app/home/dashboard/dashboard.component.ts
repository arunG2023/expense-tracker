import { Component, OnInit } from '@angular/core';
import { chartConfig, graphFilter, htmlLabel } from 'src/app/core/config/common-config';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { ExpenseTableData } from 'src/app/core/interfaces/interface';
import { ExpenseService } from 'src/app/core/services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public graphFilter: any[] = graphFilter;
  public htmlLabel: any = htmlLabel;
  public number = '12.699';

  public weeklyChart: any;
  public categoryChart: any;

  // Will be from API:
  public expenseTableData: ExpenseTableData = {
    limit: 5,
    title: "Recent Expense",
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

  constructor(
        private _expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.createWeeklyGraph('bar');
    this.createPieChart();

    this._expenseService.getUserExpenses().subscribe(res => console.log(res), err => console.log(err))
  }



  public createWeeklyGraph(chartType: keyof ChartTypeRegistry){
    if(this.weeklyChart) this.weeklyChart.destroy(); 

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    // Will be from API:
    const yValues = [55, 49, 44, 24, 15,120,67.8];

    this.weeklyChart = new Chart("weeklyChart", {
      type: chartType,
      data: {
        // values on X-Axis
        labels: chartConfig.X_AXIS,
      
	       datasets: [
          {
            label: chartConfig.BAR_LABEL,
            data: yValues,
            backgroundColor: chartConfig.BAR_COLOR,
            borderColor: chartConfig.BAR_COLOR,
            borderRadius: 2
          }
        ]
      },
      options: {
        aspectRatio:2.5,
      }
      
    });
  }

  public createPieChart(){
    if(this.categoryChart) this.categoryChart.destroy(); 

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    // Will be from API:
    const xValues = ['foo','ss','sa','sas','asasas','ewqeref','sdds'];
    const yValues = [55, 49, 44, 24, 15,120,33.67];
    const bg = ['red','green'];

    xValues.forEach(x => {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      bg.push( "rgb(" + r + "," + g + "," + b + ")");
    })

    this.categoryChart = new Chart("pieChart", {
      type: 'pie',
      data: {
        // values on X-Axis
        labels: xValues,
      
	       datasets: [
          {
            label: chartConfig.BAR_LABEL,
            data: yValues,
            backgroundColor: bg ,
            borderColor: 'white',
            borderRadius: 2
          }
        ]
      },
      options: {
        
      }
    });
  }

}
