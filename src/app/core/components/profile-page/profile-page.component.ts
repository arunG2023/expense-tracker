import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { htmlLabel } from '../../config/common-config';

@Component({
  standalone: true,
  imports: [CommonModule],
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

  public editField: string = "";

  constructor(
      private _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.getUserProfileData()
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe((data: any) => {
        if(data && data.data){
          console.log(data)
          this.userProfileData = data.data[0];
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


}
