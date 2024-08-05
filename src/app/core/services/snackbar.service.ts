import { Injectable } from '@angular/core';
import { SnackBar } from '../interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public snackBarDataSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public snackBarData: Observable<any> = this.snackBarDataSubject.asObservable();

  constructor() { }

  public setData(data: SnackBar){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    this.snackBarDataSubject.next(data)
  }



}
