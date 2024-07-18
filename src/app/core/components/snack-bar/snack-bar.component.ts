import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBar } from '../../interfaces/interface';
import { SnackbarService } from '../../services/snackbar.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';
import { snackBar } from '../../config/common-config';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public snackBarType?: string;
  public showSnackBar: boolean = false;
  public snackBarMessage?: string;

  constructor(
      private _snackBarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this._snackBarService.snackBarData
      .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
      .subscribe(data => {
        if(data){
            this.snackBarMessage = data.message;
            this.snackBarType = data.type;
            this.showSnackBar = true;
            setTimeout(() => {
              this.showSnackBar = false;
            },this._getTimeOut(data.time))
        }
      })
  }

  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }


  private _getTimeOut(time: number): number{
    if(time){
      if(time <= 0) return snackBar.TIME.MIN;
      if(time <= 10) return time * 1000;
      if(time <= snackBar.TIME.MIN) return snackBar.TIME.MIN;
      if(time >= snackBar.TIME.MAX || time <= snackBar.TIME.MAX) return snackBar.TIME.MAX;
    }
    return snackBar.TIME.MIN;
  }

}
