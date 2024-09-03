import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() isDarkMode: EventEmitter<boolean> = new EventEmitter(false);
  @Output() sideBar: EventEmitter<boolean> = new EventEmitter(false);
  @Output() profileBar: EventEmitter<boolean> = new EventEmitter(false);
  public darkTheme: boolean = false;
  public sideBarVal: boolean = false;
  public profileBarVal: boolean = false;
  public pageTitle: string = '';

  constructor(
    private _routerService: RouteService
  ) { }

  ngOnInit(): void { 
    this._routerService.routeTitle.subscribe(sideBar => {
      this.pageTitle = sideBar.title;
    })
  }



  public changeTheme(val: boolean) {
    this.darkTheme = val;
    this.isDarkMode.emit(val);
  }

  public showSideBar(val: boolean){
    this.sideBar.emit(val);
  }

  public showProfileBar(val: boolean){
    this.profileBar.emit(val);
  }

}
