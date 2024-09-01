import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { htmlLabel, messages, snackBar, validationLimit, validationRegex } from '../../config/common-config';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { Subject } from 'rxjs/internal/Subject';
import { ExpenseService } from '../../services/expense.service';
import { switchMap, takeUntil } from 'rxjs';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AddExpense, EditExpense, ExpenseTableData } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { routesConfig } from '../../config/routes-config';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-add-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.css']
})
export class AddExpenseFormComponent implements OnInit {
  @Input() editData: any = null;

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public addExpenseForm: FormGroup;

  // HTML Label
  public htmlLabel: any = htmlLabel;

  // Validation Messages
  public validationMessages: any = messages.ERROR;

  //Min Date
  public today: string = new Date().toISOString().split('T')[0];

  public categoryOption: any[] = [];
  public modeOption: any[] = [];

  constructor(
    private _snackBarService: SnackbarService,
    private _expenseService: ExpenseService,
    private _router: Router,
    private _spinnerService: LoadingSpinnerService,
    public _modalService: ModalService
  ) {
    this.addExpenseForm = new FormGroup({
      name: new FormControl('', [Validators.required, expenseNameCheck()]),
      amount: new FormControl('', [Validators.required, amountCheck()]),
      category: new FormControl('', Validators.required),
      mode: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if (this.editData) {
      // console.log(this.editData);
      let select = document.getElementsByClassName("custom-select-dev-option")
      if (select && select.length) {
        for (let i = 0; i < select.length; i++) {
          select[i].classList.add("background-color-white")
          this._fillFormForEdit(this.editData)
        }
      }

    }
    this._checkForCategoryAdd();
    this._expenseService.getCategoryData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()),
        switchMap((resCategories: any) => {
          this.categoryOption = resCategories.data;
          return this._expenseService.getModeDate()
        }))
      .subscribe(modeDate => {
        this.modeOption = modeDate.data;
      })
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  // Update category option when added:
  private _checkForCategoryAdd() {
    this._modalService.categoryOptions.asObservable()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => {
        if (data) {
          // console.log(data);
          this.categoryOption = data;
          this.hover2();
          this.onCategorySelect(data[data.length - 1].category)
        }
      })
  }

  public addExpense() {
    this.addExpenseForm.markAllAsTouched();
    if (this.addExpenseForm.valid) {
      const payload: AddExpense = {
        name: this.addExpenseForm.value.name,
        amount: this.addExpenseForm.value.amount,
        date: new Date(this.addExpenseForm.value.date).toDateString(),
        modeId: this._getModeIdFromMode(this.addExpenseForm.value.mode),
        categoryId: this._getCategoryIdFromCategory(this.addExpenseForm.value.category)
      }
      this._spinnerService.startSpinner();
      this._expenseService.addExpense(payload)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(respone => {
            this._getExpenseForRefresh(respone);
        }
          , err => {
            this._spinnerService.stopSpinner();
            if (err.error.message) {
              this._snackBarService.setData({
                message: err.error.message,
                type: snackBar.TYPE.ERROR,
                time: 5
              });
            }
          }
        )

    }
    else {
      this._snackBarService.setData({
        message: messages.ERROR.FILL_ALL,
        type: snackBar.TYPE.ERROR,
        time: 5
      });
    }
  }


  public showOption1: boolean = false;
  public showOption2: boolean = false;
  public hover1() {
    this.showOption1 = !this.showOption1;
  }

  public hover2() {
    this.showOption2 = !this.showOption2;
  }

  public onModeSelect(mode: string) {
    this.addExpenseForm.controls['mode'].setValue(mode);
    this.hover1();
  }

  public onCategorySelect(category: string) {
    this.addExpenseForm.controls['category'].setValue(category);
    this.hover2();
  }

  private _getModeIdFromMode(name: string) {
    return this.modeOption.find(mode => name == mode.mode).modeId;
  }

  private _getCategoryIdFromCategory(name: string) {
    return this.categoryOption.find(category => name == category.category).categoryId;
  }


  public openAddCategoryModal() {
    this._modalService.showModal({ isAddCategory: true, isUpdateExepense: false });
    this.hover2();
  }

  // Edit Expense:
  private _fillFormForEdit(expenseData: any) {
    this.addExpenseForm.controls["name"].setValue(expenseData.name);
    this.addExpenseForm.controls["amount"].setValue(expenseData.amount);
    this.addExpenseForm.controls["category"].setValue(expenseData.category);
    this.addExpenseForm.controls["mode"].setValue(expenseData.mode);

    // 2024-08-13
    let expenseDate = new Date(expenseData.date);
    let month = (expenseDate.getMonth() + 1 < 10) ? "0" + (expenseDate.getMonth() + 1) : expenseDate.getMonth() + 1;
    let date = (expenseDate.getDate() < 10) ? "0" + expenseDate.getDate() : expenseDate.getDate();
    this.addExpenseForm.controls["date"].setValue(`${expenseDate.getFullYear()}-${month}-${date}`);
  }

  public updateExpense() {
    this.addExpenseForm.markAllAsTouched();
    if (this.addExpenseForm.valid) {
      const payload: EditExpense = {
        name: this.addExpenseForm.value.name,
        amount: this.addExpenseForm.value.amount,
        date: new Date(this.addExpenseForm.value.date).toDateString(),
        modeId: this._getModeIdFromMode(this.addExpenseForm.value.mode),
        categoryId: this._getCategoryIdFromCategory(this.addExpenseForm.value.category),
        expenseId: this.editData.expenseId
      }
      this._expenseService.editExpense(payload)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(res => {
          this._getExpenseForRefresh(res);
        },
          err => {
            this._spinnerService.stopSpinner();
            if (err.error.message) {
              this._snackBarService.setData({
                message: err.error.message,
                time: 5,
                type: snackBar.TYPE.ERROR
              })
            }
          })
    }
    else {
      this._snackBarService.setData({
        message: messages.ERROR.FILL_ALL,
        type: snackBar.TYPE.ERROR,
        time: 5
      });
    }
  }

  private _getExpenseForRefresh(response: any) {
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
        this.addExpenseForm.reset();
        this._router.navigate([routesConfig.HOME, routesConfig.DASHBOARD])
        this._modalService.hideModal();
      })
  }
}


export function expenseNameCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (value && value.trim().length > 0) {
      let letters: any[] = value.match(/\w/g);
      return (!letters || letters.length < 3) ? { invalidName: true } : null;
    }
    return (value && value.trim().length == 0) ? { invalidName: true } : null;
  }
}

export function amountCheck(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;
    if (value && value.length) {
      return validationRegex.AMOUNT_REGEX.test(value) ? null : { invalidAmount: true };
    }
    return null;
  }
}