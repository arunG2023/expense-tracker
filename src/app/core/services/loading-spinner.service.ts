import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  public loadSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadSpinner$: Observable<boolean> = this.loadSpinner.asObservable(); 

  constructor() { }

  public startSpinner(){
    document.body.classList.add('body');
    this.loadSpinner.next(true);
  }

  public stopSpinner(){
    document.body.classList.remove('body');
    this.loadSpinner.next(false);
  }
}
