import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { sideBarRoutes } from 'src/app/core/config/routes-config';
import { SideBar } from 'src/app/core/interfaces/interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() sideBarClose: EventEmitter<boolean> = new EventEmitter(false);

  public sideBarItems: SideBar[] = sideBarRoutes;
   
  constructor() { }

  ngOnInit(): void {
  }

  public closeSideBar(){
    this.sideBarClose.emit(true);
  }

}
