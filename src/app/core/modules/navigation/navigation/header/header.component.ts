import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() isDarkMode: EventEmitter<boolean> = new EventEmitter(false);
  @Output() sideBar: EventEmitter<boolean> = new EventEmitter(false);
  public darkTheme: boolean = false;
  public sideBarVal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public changeTheme(val: boolean) {
    this.darkTheme = val;
    this.isDarkMode.emit(val);
  }

  public showSideBar(val: boolean){
    this.sideBar.emit(val);
  }

}
