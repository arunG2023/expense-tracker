import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { htmlLabel, messages, snackBar, validationRegex } from '../../config/common-config';
import { FormsModule, NgModel } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { EditUser } from '../../interfaces/interface';
import { ModalService } from '../../services/modal.service';
import { FileService } from '../../services/file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

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
  public profileImgSrc: SafeUrl | null = null;

  constructor(
      private _userService: UserService,
      private _snackBarService: SnackbarService,
      private _modalService: ModalService,
      private _fileService: FileService,
      private _spinnerService: LoadingSpinnerService
  ) { }

  ngOnInit(): void {
      this._getuserData();
      this._getProfileImage();

  }

  private _getuserData(){
    // this._spinnerService.startSpinner();
    this._userService.getUserProfileData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((data: any) => {
        if(data && data.data){
          this.userProfileData = data.data[0];
          this.userProfileDataCopy = {...this.userProfileData}
        }

        if(data && data.isProfileExists){
          let payload = {
            "fileName": data.isProfileExists
          }      
          this._fileService.getUserProfileImage(payload)
            .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
            .subscribe((data: Blob) => {
              this._fileService.sanitizeBlob(data);
              // this._spinnerService.stopSpinner();
            })
        }
        else{
          // this._spinnerService.stopSpinner();
        }
      })
  }

  private _getProfileImage(){
    this._fileService.profileImageUrl$.pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(url => {
        this.profileImgSrc = url;
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


  // Image Upload:
  public showImageUpload(){
    this._modalService.showModal({
      isAddCategory: false,
      isUpdateExepense: false,
      isImageUpload: true
    })
  }

}
