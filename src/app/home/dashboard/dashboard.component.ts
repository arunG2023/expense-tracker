import { Component, OnInit } from '@angular/core';
import { chartConfig, graphFilter, htmlLabel } from 'src/app/core/config/common-config';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { ExpenseTableData } from 'src/app/core/interfaces/interface';
import { ExpenseService } from 'src/app/core/services/expense.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RouteService } from 'src/app/core/services/route.service';
import { routesConfig } from 'src/app/core/config/routes-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public graphFilter: any[] = graphFilter;
  public htmlLabel: any = htmlLabel;

  public weeklyChart: any;
  public categoryChart: any;

  // Will be from API:
  public expenseTableData: ExpenseTableData = {
    limit: 5,
    title: "Recent Expense",
    data: []
  }


  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public expenseDataFromAPI: any; 

  public graphWeekFilter: string = graphFilter[0].option;

  public refreshData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
        private _expenseService: ExpenseService,
        private _routeService: RouteService,
        private _router: Router
  ) { }

  ngOnInit(): void {
    this._routeService.setTitle(this._routeService.findRoute(routesConfig.DASHBOARD));
  
    this._expenseService.getExpenseData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => {
        
        if(data && data.data){
          this.expenseDataFromAPI = data.data;
          // Checking only the allExpense arr and not its length to accomodate no expenses
          if(this.expenseDataFromAPI.allExpenses){
            this.expenseTableData.data = this._getRecentExpense(data);
            this.refreshData.next(this._getRecentExpense(data));
           
            setTimeout(() => {
              if(this.expenseDataFromAPI.allExpenses.length){
                this.createPieChart(data.data, 'category');
                this.createWeeklyGraph('bar', graphFilter[0].option);
                
              }
            }, 50)
          }
        }
      });
   
  }


  private _getRecentExpense(data: any) {
    // Shallow copying object to sort only this copy
    let expenses = Object.assign([],data.data.allExpenses);
    return this._expenseService.sortExpenseByDateDesc(expenses).slice(0, 5);
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }




  public currentChartType: keyof ChartTypeRegistry = 'bar'
  public createWeeklyGraph(chartType: keyof ChartTypeRegistry,filter: string){
    if(this.weeklyChart) this.weeklyChart.destroy(); 
    this.currentChartType = chartType;
    this.graphWeekFilter = filter;

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    // Will be from API:
    let yValues: any[] = [];
    let xValues: any[] = chartConfig.X_AXIS;

    if(filter == graphFilter[0].option){
      if(this.expenseDataFromAPI && this.expenseDataFromAPI.currentWeekExpenses && this.expenseDataFromAPI.currentWeekExpenses.graphData.length){
          xValues = chartConfig.X_AXIS;
          yValues = this._buildWeekData(this.expenseDataFromAPI.currentWeekExpenses.graphData)
      }
    }
    else if (filter == graphFilter[1].option) {
      if(this.expenseDataFromAPI && this.expenseDataFromAPI.previousWeekExpenses && this.expenseDataFromAPI.previousWeekExpenses.graphData.length){
          xValues = chartConfig.X_AXIS;
          yValues = this._buildWeekData(this.expenseDataFromAPI.previousWeekExpenses.graphData);
      }
    }
    else {
      if(this.expenseDataFromAPI && this.expenseDataFromAPI.monthlyExpenses && this.expenseDataFromAPI.monthlyExpenses.length){
        xValues = chartConfig.X_AXIS_MONTH;
        yValues = this._buildMonthData(this.expenseDataFromAPI.monthlyExpenses);
      }
    }



    this.weeklyChart = new Chart("weeklyChart", {
      type: chartType,
      data: {
        // values on X-Axis
        labels: xValues,
      
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

  public createPieChart(data: any, type: string){
    if(this.categoryChart) this.categoryChart.destroy(); 

    Chart.defaults.color = chartConfig.TEXT_COLOR;

    // Will be from API:

    // For Category
    const xValues:any[] = [];
    const yValues:any[] = [];
   
    if(data && type == 'category' && data.expenseCategoryData && data.expenseCategoryData.length > 0){
      data.expenseCategoryData.forEach((category: any) => {
        xValues.push(category.category);
        yValues.push(category.amount)
      })
    }

    if(data && type == 'mode' && data.expenseModeData && data.expenseModeData.length > 0){
      data.expenseModeData.forEach((mode: any) => {
        xValues.push(mode.mode);
        yValues.push(mode.amount)
      })
    }
   

    const bg:any[] = [];

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


  private _buildWeekData(data:any){
    const yValues: number[] = [0,0,0,0,0,0,0];
    data.forEach((exp:any) => {
      yValues[chartConfig.X_AXIS.indexOf(exp.day)] = exp.amount;
    });
    return yValues;
  }

  private _buildMonthData(data: any){
    const yValues: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    data.forEach((exp:any) => {
      yValues[chartConfig.X_AXIS_MONTH.indexOf(exp.month)] = exp.amount;
    });
    return yValues;
  }

  public gotoAddExpense(){
    this._routeService.setTitle(this._routeService.findRoute(routesConfig.ADD_EXPENSE));
    this._router.navigate([routesConfig.HOME, routesConfig.ADD_EXPENSE]);
  }

}
