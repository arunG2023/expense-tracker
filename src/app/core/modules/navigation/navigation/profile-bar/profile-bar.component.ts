import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { htmlLabel, messages, snackBar } from 'src/app/core/config/common-config';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.css']
})
export class ProfileBarComponent implements OnInit {
  @Output() profileBarClose: EventEmitter<any> = new EventEmitter(false);

  // HTML Labels
  public htmlLabel: any = htmlLabel;

  public userData: any;
  constructor(
    private _userService: UserService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.userData =  this._userService.decodeToken();
  }

  public closeProfileBar(){
    this.profileBarClose.emit(true);
  }

  public logOutUser(){
    this._snackBarService.setData({
      message: messages.SUCCESS.LOGGED_OUT,
      time: 2,
      type: snackBar.TYPE.SUCCESS
    })
    this._userService.logOutUser();
  }

  public showProfilePage(){
    
    this._userService.showProfilePage();
  }

}


