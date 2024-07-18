import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarComponent } from 'src/app/core/components/snack-bar/snack-bar.component';
import { htmlLabel, messages, snackBar, validationLimit } from 'src/app/core/config/common-config';
import { routesConfig } from 'src/app/core/config/routes-config';
import { Login } from 'src/app/core/interfaces/interface';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _loginData?: Login;

  public loginForm: FormGroup;

  // Html Error Messages:
  public validationMessages: any = messages.ERROR;

  // Html Labels:
  public htmlLabel: any = htmlLabel;

  // Routes
  public routes: any = routesConfig;

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  // Spinner 
  public loadSpinner: boolean = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBarService: SnackbarService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required ])
    })
   }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  public loginUser(){
    if(this.loginForm.valid){
        this.loadSpinner = true;
        this._loginData = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
        this._userService.loginUser(this._loginData)
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(
          res => {
            this.loadSpinner = false;
            this._snackBarService.setData({
              message: res.message,
              type: snackBar.TYPE.SUCCESS,
              time: snackBar.TIME.MIN
            });
            this._userService.storeAccessToken(res.token);
            this._router.navigate([routesConfig.HOME]);
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
        time: snackBar.TIME.MIN
      });
    }
  }
}



// export function passwordStrengthCheck(): ValidatorFn {
//   return (control: AbstractControl) : ValidationErrors | null => {
//     let value = control.value;
//     if(value && value.length >= validationLimit.PASSWORD_MIN_LENGTH && value.length <= validationLimit.PASSWORD_MAX_LENGTH){
      
//     const hasNumbers = /\d+/.test(value);

//     value = value.replaceAll(/\w/g,"");
//     value = value.replaceAll(/\d/g,"");

//     const hasSpecialCharacters = value.length > 0;
//     return (!hasNumbers || !hasSpecialCharacters)? { invalidPassword: true } : null;
//     }
//     return null;
//   } 
// }
