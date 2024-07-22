import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { routesConfig, sideBarRoutes } from '../config/routes-config';
import { SideBar } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public path: string = location.pathname.split('/')[2];
  public routeTitle$: BehaviorSubject<any> = new BehaviorSubject(sideBarRoutes.find(route => route.path == this.path));
  public routeTitle: Observable<SideBar> = this.routeTitle$.asObservable();

  public setTitle(route: SideBar){
      this.routeTitle$.next(route);
  }

  constructor() { 
    console.log(location.pathname.split('/')[2])
  }
}
