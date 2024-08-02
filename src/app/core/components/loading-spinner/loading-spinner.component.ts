import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  // Subject to destroy
  private _ngUnsubscribe: Subject<void> = new Subject();

  public showSpinner: boolean = true;
  constructor(
    private _spinnerService: LoadingSpinnerService
  ) { }

  ngOnInit(): void {
    this._spinnerService.loadSpinner    
        .pipe(takeUntil(this._ngUnsubscribe.asObservable()))
        .subscribe(data => {
          console.log(data);
          this.showSpinner = data;
        })
  }
  ngOnDestroy(): void{
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

}
