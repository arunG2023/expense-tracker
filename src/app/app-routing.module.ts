import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesConfig } from './core/config/routes-config';
import { HomeComponent } from './home/home/home.component';
import { ErrorPageComponent } from './core/components/error-page/error-page.component';

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
    component: HomeComponent,
    loadChildren: () => import('../app/home/home.module').then(module => module.HomeModule)
  },
  {
    path: routesConfig.ERROR_PAGE,
    component: ErrorPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
