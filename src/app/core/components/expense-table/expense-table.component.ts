import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseTableData, GetPDF } from '../../interfaces/interface';
import { fileConfig, htmlLabel, messages, snackBar } from '../../config/common-config';
import { RoundPipe } from '../../pipes/round.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { DialogService } from '../../services/dialog.service';
import { ExpenseService } from '../../services/expense.service';
import { min, Observable, Subject, takeUntil } from 'rxjs';
import { FileService } from '../../services/file.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ModalService } from '../../services/modal.service';
import { SnackbarService } from '../../services/snackbar.service';

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
  public fileConfig: any = fileConfig;

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  @Input() inputData: ExpenseTableData = {
    title: htmlLabel.TEXT.APPLICATION_NAME,
    limit: 1,
    data: []
  }

  @Input() refreshData: Observable<any> = new Observable();

  public searchInput: string = '';

  public expenseTableData: any[] = [];

  constructor(
    private _dialogService: DialogService,
    private _expenseSerice: ExpenseService,
    private _fileService: FileService,
    private _spinnerService: LoadingSpinnerService,
    private _modalService: ModalService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.expenseTableData = this.inputData.data;

    this.refreshData.pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => this.expenseTableData = data);
  }

  public filterTable(searchText: string) {
    if (searchText && searchText.length > 0) {
      this.expenseTableData = this.inputData.data.filter((expense): boolean | undefined => {
        if (this.inputData.data.length > 0) {
          for (const key in expense) {
            // Filter based on the below keys
            if (["name", "category", "amount", "mode", "date"].includes(key)) {
              const value = expense[key].toString().toLowerCase();
              if (value.includes(searchText.toLowerCase())) return true;
            }

          }
        }
        return false;
      })
    }
    else {
      this.expenseTableData = this.inputData.data
    }
  }


  public deleteExpense(id: string, name: string) {
    this._dialogService.showDialog({
      isShow: true, data: {
        id: id,
        name: name
      }
    })
  }

  public editExpense(data: any) {
    this._modalService.showModal({
      isUpdateExepense: true,
      isAddCategory: false,
      data: data
    })
  }



  public page: number = 1;

  public pageChanged(thisPage: any) {
    this.page = thisPage
  }


  // Getting Pdf Files:
  public getPdfFile() {
    if (this.expenseTableData.length > 0) {
      this._spinnerService.startSpinner();
      let data: GetPDF = {
        "type": "1",
        "data": {
          "title": fileConfig.FILE_TITLE,
          "data": this.expenseTableData
        }
      }
      this._fileService.getPdf(data).pipe(
        takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(blob => {
          this._spinnerService.stopSpinner();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileConfig.FILE_NAME;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
    }
    else{
      this._snackBarService.setData(
        {
          message: htmlLabel['TEXT']['NO_EXPENSE_FOUND'],
          time: snackBar.TIME.MIN,
          type: snackBar.TYPE.ERROR
        }
      )
    }

  }
}

