import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
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

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public userData: any;
  constructor(
    private _userService: UserService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    // On First Load
    this._userService.getUserProfileData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => {
        data = data.data[0];
        this._setUserData(data);
      })

      // When profile updated:
      this._userService.profilePage$
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(
          data => {
            this._setUserData(data);
          }
        )
  }

  private _setUserData(data: any){
    if(data.firstName && data.lastName){
      this.userData = {
        name : data.firstName + " " + data.lastName
      };
    }
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
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


