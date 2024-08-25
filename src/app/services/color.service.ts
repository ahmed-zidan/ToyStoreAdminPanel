import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private http:HttpClient) {

  }

  getColors(){
   return this.http.get(environment.apiUrl+"Color/get");
  }
}
