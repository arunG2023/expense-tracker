import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { htmlLabel, messages, snackBar, validationRegex } from '../../config/common-config';
import { FormsModule, NgModel } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { EditUser } from '../../interfaces/interface';

@Component({
  standalone: true,
  imports: [
            CommonModule,
            FormsModule
          ],
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  // Html Label Config:
  public htmlLabel: any = htmlLabel

  public userProfileData: any
  public userProfileDataCopy: any;

  public editField: string = "";
  public editedValue: string = "";

  constructor(
      private _userService: UserService,
      private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
      this._getuserData();
  }

  private _getuserData(){
    this._userService.getUserProfileData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((data: any) => {
        if(data && data.data){
          this.userProfileData = data.data[0];
          this.userProfileDataCopy = {...this.userProfileData}
        }
      })
  }


  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }


  public closeProfilePage(){
    this._userService.closeProfilePage();
  }


  public updateProfile(key: string, value: string){
    if(this._checkEditedValue(value)){
        const payload: EditUser = {
          key,value
        } 
        this._userService.updateUserDetails(payload)
          .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
          .subscribe(res => {
              this._snackBarService.setData(
                {
                  type: snackBar.TYPE.SUCCESS,
                  message: res.message,
                  time: snackBar.TIME.MIN
                }
              )
              this._userService.profilePage.next(this.userProfileData);
              this.userProfileDataCopy = {...this.userProfileData}
              this.editField = "";
          })
    }
    else{
      this._snackBarService.setData({
        message: messages.ERROR.INVALID_FIELD(this.editField),
        type: snackBar.TYPE.ERROR,
        time: snackBar.TIME.MIN
      });
    }
  }

  private _checkEditedValue(value: string){
    if(!value){
      return false;
    }
    if(this.editField == htmlLabel['TEXT']['FIRST_NAME'] || this.editField == htmlLabel['TEXT']['LAST_NAME']){
        return validationRegex.NAME_REGEX.test(value);
    }
    
    if(this.editField == htmlLabel['TEXT']['PHONE']){
      return validationRegex.PHONE_NUMBER_REGEX.test(value);
    }

    return true;

  }


  public hideEditField(key: string){
      this.userProfileData[key] = this.userProfileDataCopy[key]
      this.editField = "";
  }

}
