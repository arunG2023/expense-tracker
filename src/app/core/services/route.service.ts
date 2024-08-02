import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { sideBarRoutes } from '../config/routes-config';
import { SideBar } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  public path: string = location.pathname.split('/')[2];
  public routeTitle$: BehaviorSubject<any> = new BehaviorSubject(this.findRoute(this.path));
  public routeTitle: Observable<SideBar> = this.routeTitle$.asObservable();

  public setTitle(route: SideBar){
      this.routeTitle$.next(route);
  }


  constructor() { 
  }

  public findRoute(path: string): SideBar{
    let sideBar: any = sideBarRoutes.find(route => route.path == path);
    if(sideBar){
      return sideBar;
    }
    return sideBarRoutes[0];

  }
}
