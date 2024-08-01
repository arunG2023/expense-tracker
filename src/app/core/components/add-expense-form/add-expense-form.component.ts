import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { htmlLabel, messages, snackBar, validationLimit, validationRegex } from '../../config/common-config';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { Subject } from 'rxjs/internal/Subject';
import { ExpenseService } from '../../services/expense.service';
import { switchMap, takeUntil } from 'rxjs';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AddExpense } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { routesConfig } from '../../config/routes-config';

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
  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public loadSpinner: boolean = false;

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
    private _router: Router
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

  public addExpense() {
    this.addExpenseForm.markAllAsTouched();
    if (this.addExpenseForm.valid) {
      const payload: AddExpense = {
        name: this.addExpenseForm.value.name,
        amount: this.addExpenseForm.value.amount,
        date: new Date(this.addExpenseForm.value.date).toDateString(),
        modeId: this.addExpenseForm.value.mode,
        categoryId: this.addExpenseForm.value.category
      }
      this.loadSpinner = true;
      this._expenseService.addExpense(payload)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(res => {
          this._expenseService.getExpenseDataFromAPI()
            .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
            .subscribe(res => {
              this.loadSpinner = false;
              this._expenseService.setExpenseData(res);
              this.loadSpinner = false;
              this._snackBarService.setData({
                message: res.message,
                type: snackBar.TYPE.SUCCESS,
                time: snackBar.TIME.MIN
              });
              this.addExpenseForm.reset();
              this._router.navigate([routesConfig.HOME, routesConfig.DASHBOARD])
            })
        }
          , err => {
            this.loadSpinner = false;
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