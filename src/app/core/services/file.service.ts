import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiUrl } from '../config/api-url-config';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private _profilImageUrlObserver: BehaviorSubject<any> = new BehaviorSubject(null);
  public profileImageUrl$: Observable<any> = this._profilImageUrlObserver.asObservable();

  constructor(
    private _http: HttpClient,
    private _sanitizer: DomSanitizer
  ) { }


  public getPdf(data: any):Observable<Blob>{
    return this._http.post(apiUrl.GET_PDF,data, { responseType: 'blob'})
  }

  public getUserProfileImage(data: any): Observable<Blob>{
    return this._http.get(apiUrl.GET_USER_PROFILE_IMG, {
      params:data,
      responseType: 'blob'
    })
  }
  
  public sanitizeBlob(blob: Blob){
    let profileImageUrl = this._sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    this._profilImageUrlObserver.next(profileImageUrl);
  }
}
