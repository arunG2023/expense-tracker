import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorData } from '../../interfaces/interface';
import { errorPageConfig } from '../../config/common-config';
import { ActivatedRoute, Router } from '@angular/router';
import { routesConfig } from '../../config/routes-config';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule,LoadingSpinnerComponent],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public loadSpinner: boolean = false;

  public errorData: ErrorData = errorPageConfig.INTERNAL_SERVER_ERROR;

  constructor(
      private _activatedRoute: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      if(params['code'] == 403){
        this.errorData = errorPageConfig.FORBIDDEN;
      }
      else if(params['code'] == 404){
        this.errorData = errorPageConfig.PAGE_NOT_FOUND;
      }
      else{
        this.errorData = errorPageConfig.INTERNAL_SERVER_ERROR;
      }
    })
  }


  public retry(errorCode: string){
    this.loadSpinner = true;
    if(errorCode == '500' || errorCode == '404'){
      setTimeout(() => {
        this.loadSpinner = false;
        this._router.navigate([routesConfig.HOME,routesConfig.DASHBOARD]);
      }, 1000)
    }
    else{
      this.loadSpinner = false;
      this._router.navigate([routesConfig.USER,routesConfig.LOGIN])
    }
  }

}
