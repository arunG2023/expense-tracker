import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { htmlLabel } from 'src/app/core/config/common-config';
import { routesConfig, sideBarRoutes } from 'src/app/core/config/routes-config';
import { SideBar } from 'src/app/core/interfaces/interface';
import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() sideBarClose: EventEmitter<boolean> = new EventEmitter(false);
  public htmlLabel: any = htmlLabel

  public sideBarItems: SideBar[] = sideBarRoutes;
   
  constructor(
      private _router: Router,
      private _routerService: RouteService
  ) { }

  ngOnInit(): void {
    this._routerService.routeTitle.subscribe(sideBar => {
      this.sideBarItems.forEach(item => {
        if(item == sideBar){
          item.isActive = true;
        }
        else{
          item.isActive = false;
        }
      })
    })
  }

  public closeSideBar(){
    this.sideBarClose.emit(true);
  }

  public gotoLocation(sideBar: SideBar){
    this._router.navigate([routesConfig.HOME ,sideBar.path]);
    this._routerService.setTitle(sideBar);
    this.sideBarClose.emit(true);
  }

}
