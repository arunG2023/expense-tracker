import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogBox } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public initialState: DialogBox = { isShow: false }
  public dialogData: BehaviorSubject<DialogBox> = new BehaviorSubject(this.initialState);
  public dialogData$: Observable<any> = this.dialogData.asObservable();

  public showDialog(data: DialogBox){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    document.body.classList.add('body');
    this.dialogData.next(data);
  }

  public hideDialog(){
    this.dialogData.next(this.initialState);
    document.body.classList.remove('body');
  }

  constructor() { }
}
