import { Injectable } from '@angular/core';
import { Modal } from '../interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public initialState: Modal = { isAddCategory: false, isUpdateExepense: false };
  public modalData: BehaviorSubject<Modal> = new BehaviorSubject(this.initialState);
  public modalData$: Observable<any> = this.modalData.asObservable();


  public showModal(data: Modal){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    document.body.classList.add('body');
    this.modalData.next(data);
  }

  public hideModal(){
    this.modalData.next(this.initialState);
  }

  constructor() { }
}
