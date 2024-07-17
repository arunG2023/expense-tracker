import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { routesConfig } from '../core/config/routes-config';

const userRoutes: Routes = [
  {
    path: routesConfig.LOGIN,
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: routesConfig.LOGIN,
    pathMatch: 'full'
  },
  {
    path: routesConfig.REGISTER,
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
