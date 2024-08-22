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

  // Category Add:
  public categoryOptions: BehaviorSubject<any> = new BehaviorSubject(null);


  public showModal(data: Modal){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
    document.body.classList.add('body');
    this.modalData.next(data);
  }

  public hideModal(isAdded: boolean = false, categoryData: any = null){
    if(isAdded && categoryData) this.categoryOptions.next(categoryData)
    this.modalData.next(this.initialState);
    document.body.classList.remove('body');
  }

  constructor() { }
}
