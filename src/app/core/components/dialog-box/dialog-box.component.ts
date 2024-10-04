import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { DialogBox, Modal } from '../../interfaces/interface';
import { ExpenseService } from '../../services/expense.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { SnackbarService } from '../../services/snackbar.service';
import { htmlLabel, messages, snackBar } from '../../config/common-config';
import { ModalService } from '../../services/modal.service';
import { FormsModule } from '@angular/forms';
import { AddExpenseFormComponent } from '../add-expense-form/add-expense-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [
            CommonModule,
            LoadingSpinnerComponent,
            FormsModule,  
            AddExpenseFormComponent
          ],
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  public showDialog: boolean = false;
  public showAddCategory: boolean = false;
  public showEditExpense: boolean = false;
  public showUploadImage: boolean = false;


  // Label config;
  public htmlLabel: any = htmlLabel;

  
  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public expenseData: any;

  constructor(
    private _dialogService: DialogService,
    private _expenseService: ExpenseService,
    private _spinnerService: LoadingSpinnerService,
    private _snackBarService: SnackbarService,
    private _modalService: ModalService,
    private _userService: UserService
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
    this._checkForModal();
  }

  private _checkForModal(){
      this._modalService.modalData$
          .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
          .subscribe((data: Modal) => {
            this.showAddCategory = data.isAddCategory;
            this.showEditExpense = data.isUpdateExepense;
            if(data.data) this.expenseData = data.data;
            this.showUploadImage = (data.isImageUpload)? true : false;
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


  // Modal
  public closeModal(){
    this._modalService.hideModal();
    
  }

  // Add Category
  @ViewChild("categoryInput") categoryInput?: ElementRef;
  // ngAfterViewInit(){
  //   console.log(this.categoryInput?.nativeElement);
  // }

  public addCategory(){
    // console.log(this.categoryInput?.nativeElement.value);
    let categoryName: string = this.categoryInput?.nativeElement.value;
    if(categoryName){
      this._spinnerService.startSpinner();
      this._expenseService.addCategory({category: categoryName})
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(res => {
          if(res && res.data){
            this._spinnerService.stopSpinner();
            this._snackBarService.setData({
              message: messages.SUCCESS.CATEGORY_ADDED,
              type: snackBar.TYPE.SUCCESS,
              time: snackBar.TIME.MIN
            });
            this._modalService.hideModal(true, res.data);
          }
        })
    }
    else{
      this._snackBarService.setData({
        message: messages.ERROR.FILL_ALL,
        type: snackBar.TYPE.ERROR,
        time: snackBar.TIME.MIN
      });
    }
  }


  // Profile Image Upload:
  public onProfileImageUpload(event: Event){
    const input = event.target as HTMLInputElement;
    let selectedFile = null;
    if(input.files && input.files.length > 0){
      selectedFile = input.files[0];
      const formData = new FormData();
      formData.append('file',selectedFile);
      this._userService.uploadProfileImage(formData)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(res => {
          console.log(res);
        })

    }
  }

}
