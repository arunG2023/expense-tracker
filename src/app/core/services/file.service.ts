import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../config/api-url-config';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _http: HttpClient
  ) { }


  public getPdf(data: any):Observable<Blob>{
    return this._http.post(apiUrl.GET_PDF,data, { responseType: 'blob'})
  }
}
