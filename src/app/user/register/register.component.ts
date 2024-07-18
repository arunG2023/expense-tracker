import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { htmlLabel, messages, snackBar, validationLimit, validationRegex } from 'src/app/core/config/common-config';
import { routesConfig } from 'src/app/core/config/routes-config';
import { RegisterUser } from 'src/app/core/interfaces/interface';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  // Html Error Messages:
  public validationMessages: any = messages.ERROR;

  // Html Labels:
  public htmlLabel: any = htmlLabel;

  // Routes
  public routes: any = routesConfig;


  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  // loading indicator
  public loadSpinner: boolean = false;

  constructor(
        private _userService: UserService,
        private _router: Router,
        private _snackBarService: SnackbarService
  ) { 
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(validationRegex.NAME_REGEX)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(validationRegex.NAME_REGEX)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(validationRegex.PHONE_NUMBER_REGEX)]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('',  [Validators.required, Validators.minLength(validationLimit.PASSWORD_MIN_LENGTH), Validators.maxLength(validationLimit.PASSWORD_MAX_LENGTH), passwordStrengthCheck() ])
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  public createUser(){
    if(this.registerForm.valid){
      this.loadSpinner = true;
      let userData: RegisterUser = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        address: this.registerForm.value.address,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
      }
      this._userService.createUser(userData)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(res => {
          this.loadSpinner = false;
          this._snackBarService.setData({
            message: res.message,
            type: snackBar.TYPE.SUCCESS,
            time: snackBar.TIME.MIN
          });
          this._router.navigate([this.routes.USER, this.routes.LOGIN]);
        },
        err => {
          this.loadSpinner = false;
          if(err.error.message){
            this._snackBarService.setData({
              message: err.error.message,
              type: snackBar.TYPE.ERROR,
              time: 5
            });
          }
          else{
            this._snackBarService.setData({
              message: messages.ERROR.SERVER_ERROR,
              type: snackBar.TYPE.ERROR,
              time: 5
            });
          }
        })
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

export function passwordStrengthCheck(): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    let value = control.value;
    if(value && value.length >= validationLimit.PASSWORD_MIN_LENGTH && value.length <= validationLimit.PASSWORD_MAX_LENGTH){
      
    const hasNumbers = /\d+/.test(value);

    value = value.replaceAll(/\w/g,"");
    value = value.replaceAll(/\d/g,"");

    const hasSpecialCharacters = value.length > 0;
    return (!hasNumbers || !hasSpecialCharacters)? { invalidPassword: true } : null;
    }
    return null;
  } 
}
