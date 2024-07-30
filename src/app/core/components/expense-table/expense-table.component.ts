import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTableData } from '../../interfaces/interface';
import { htmlLabel } from '../../config/common-config';
import { RoundPipe } from '../../pipes/round.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [  
            CommonModule,
            RoundPipe,
            FormsModule,
            NgxPaginationModule,
            TruncateStringPipe
          ],
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  // HTML Label:
  public htmlLabel: any = htmlLabel;

  @Input() inputData: ExpenseTableData = {
    title: htmlLabel.TEXT.APPLICATION_NAME,
    limit: 1,
    data: []
  }

  public searchInput: string = '';

  public expenseTableData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.expenseTableData = this.inputData.data;
  }

  public filterTable(searchText: string){
    if(searchText && searchText.length > 0){
      this.expenseTableData = this.inputData.data.filter((expense): boolean | undefined => {
        if(this.inputData.data.length > 0){
          for(const key in expense){
            const value = expense[key].toString().toLowerCase();
              if(value.includes(searchText.toLowerCase())) return true;
          }
        }
        return false;
      })
    }
    else{
      this.expenseTableData = this.inputData.data
    }
  }


public page: number = 1;

public pageChanged(thisPage: any) {
  this.page = thisPage
}

}
