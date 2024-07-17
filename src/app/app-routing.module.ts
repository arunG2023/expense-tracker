import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesConfig } from './core/config/routes-config';

const routes: Routes = [
  {
    path: routesConfig.USER,
    loadChildren: () => import('../app/user/user.module').then(module => module.UserModule)
  },
  {
    path: '',
    redirectTo: routesConfig.USER,
    pathMatch: 'full'
  },
  {
    path: routesConfig.HOME,
    loadChildren: () => import('../app/home/home.module').then(module => module.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
