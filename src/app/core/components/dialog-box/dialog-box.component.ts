import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { DialogBox } from '../../interfaces/interface';
import { ExpenseService } from '../../services/expense.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { SnackbarService } from '../../services/snackbar.service';
import { messages, snackBar } from '../../config/common-config';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
            CommonModule,
            LoadingSpinnerComponent],
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  public showDialog: boolean = false;

  
  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public expenseData: any;

  constructor(
    private _dialogService: DialogService,
    private _expenseService: ExpenseService,
    private _spinnerService: LoadingSpinnerService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._dialogService.dialogData$ 
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe((data: DialogBox) => {
          if(data.isShow){
            this.expenseData = data.data;
            this.showDialog = true;
          }
          else{
            this.showDialog = false;
          }
        })
      }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }


  public closeDialog(){
    this._dialogService.hideDialog();
  }

  public deleteExpense(){
    if(this.expenseData && this.expenseData.id){
      this._dialogService.hideDialog();
      this._spinnerService.startSpinner();
      this._expenseService.deleteExpense(this.expenseData.id)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(response => {
          this._expenseService.getExpenseDataFromAPI()
          .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
          .subscribe(res => {
            this._expenseService.setExpenseData(res);
            this._spinnerService.stopSpinner();
            this._snackBarService.setData({
              message: response.message,
              type: snackBar.TYPE.SUCCESS,
              time: snackBar.TIME.MIN
            });
          })
        })
    }
    else{
      this._snackBarService.setData({
        message: messages.ERROR.SERVER_ERROR,
        type: snackBar.TYPE.ERROR,
        time: 5
      });
    }
  }

}
