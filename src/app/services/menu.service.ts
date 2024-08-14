import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Menu } from '../Models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  _menus = signal<Menu[]>([])
  _desplayName = signal<string>("")
  constructor(private http:HttpClient) {

   }

   getMenusByRole(){
    return this.http.get(environment.apiUrl + "Menu/getMenusByRole");
   }
   getMenuAccess(menuId:number){
    return this.http.get(environment.apiUrl + "Menu/getMenuAccess/"+menuId);
   }
}
