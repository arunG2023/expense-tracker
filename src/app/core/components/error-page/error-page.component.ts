import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ErrorData } from '../../interfaces/interface';
import { errorPageConfig } from '../../config/common-config';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '../../config/routes-config';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { UserService } from '../../services/user.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule,LoadingSpinnerComponent],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  public errorData: ErrorData = errorPageConfig.INTERNAL_SERVER_ERROR;

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router,
      private _location: Location,
      private _userService: UserService,
      private _spinnerSevice: LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      this._spinnerSevice.stopSpinner();
      if(params['code'] == 403){
        this.errorData = errorPageConfig.FORBIDDEN;
      }
      else if(params['code'] == 404){
        this.errorData = errorPageConfig.PAGE_NOT_FOUND;
      }
      else if(params['code'] == 500){
        this.errorData = errorPageConfig.INTERNAL_SERVER_ERROR;
      }
      else{
        this.errorData = errorPageConfig.PAGE_NOT_FOUND;
      }
    })
  }


  public retry(errorCode: string){
    this._spinnerSevice.startSpinner();
    if(errorCode == '500'){
      setTimeout(() => {
        this._spinnerSevice.stopSpinner();
        if(this._userService.isLoggedIn()){
          this._router.navigate([routesConfig.HOME,routesConfig.DASHBOARD]);
        }
        else{
          this._router.navigate([routesConfig.USER,routesConfig.LOGIN]);
        }
      }, 1000)
    }
    else if(errorCode == '404'){
      setTimeout(() => {
        this._spinnerSevice.stopSpinner();
        this._location.back();
      }, 1000)
      
    }
    else{
      this._spinnerSevice.stopSpinner();
      this._router.navigate([routesConfig.USER,routesConfig.LOGIN])
    }
  }

}
