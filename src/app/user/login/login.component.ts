import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/interfaces/login';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _loginData?: Login;

  public loginForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
   
  }

  public loginUser(){
  
    console.log(this.loginForm.value)
    if(this.loginForm.valid){
        this._loginData = {
          userName: this.loginForm.value.userName,
          password: this.loginForm.value.password
        }
        this._userService.loginUser(this._loginData).subscribe(
          res => {
            alert(res.message);
            this._userService.storeAccessToken(res.token);
            this._router.navigate(['home']);
          },
          err => {
            alert(err.error.message)
          })
    }
    else{
      alert('Fill all fieds');
    }
  }

}
