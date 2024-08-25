import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http:HttpClient) {

  }

  getSizes(){
   return this.http.get(environment.apiUrl+"Size/get");
  }
}
