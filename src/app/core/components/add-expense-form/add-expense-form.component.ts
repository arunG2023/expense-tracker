import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { htmlLabel, messages, snackBar, validationLimit, validationRegex } from '../../config/common-config';
import { SnackbarService } from '../../services/snackbar.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.css']
})
export class AddExpenseFormComponent implements OnInit {

  public addExpenseForm: FormGroup;

  // HTML Label
  public htmlLabel: any = htmlLabel;

  // Validation Messages
  public validationMessages: any = messages.ERROR;

  //Min Date
  public today: string = new Date().toISOString().split('T')[0];

  constructor(
        private _snackBarService: SnackbarService
  ) { 
    this.addExpenseForm = new FormGroup({
      name: new FormControl('',[Validators.required, expenseNameCheck()]),
      amount: new FormControl('',[Validators.required, amountCheck()]),
      category: new FormControl('', Validators.required),
      mode: new FormControl('', Validators.required),
      date: new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  public addExpense(){
    console.log(this.addExpenseForm)
    if(this.addExpenseForm.valid){

    }
    else{
      this._snackBarService.setData({
        message: messages.ERROR.FILL_ALL,
        type: snackBar.TYPE.ERROR,
        time: 5
      });
    }
  }

}


export function expenseNameCheck(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    let value = control.value;
    if(value && value.trim().length > 0){
        let letters: any[] = value.match(/\w/g);
        return ( !letters || letters.length < 3)? {invalidName: true} : null;
    }
    return (value && value.trim().length == 0)? {invalidName: true} : null;
  } 
}

export function amountCheck(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    let value = control.value;
    if(value && value.length){
      return validationRegex.AMOUNT_REGEX.test(value) ? null : { invalidAmount: true};
    }
    return null;
  }
}