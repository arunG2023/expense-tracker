import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public changeDarkTheme: boolean = false;
  public enableSideBar: boolean = false;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public logOut(){
    this._userService.logOutUser();
  }

  public changeTheme(value: boolean){
    this.changeDarkTheme = value;
  }

  public showSideBar(value: boolean){
    this.enableSideBar = value
  }

  public closeSideBar(value: boolean){
    this.enableSideBar = !value;
  }

}
