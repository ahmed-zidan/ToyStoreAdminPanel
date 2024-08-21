import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Menu, menuAccess } from '../Models/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  _menus = signal<Menu[]>([])
  _desplayName = signal<string>("")
  _accessMenu = signal<menuAccess>({haveAdd:false,haveDelete:false,haveEdit:false,haveView:false,Id:0,MenuId:0})

  constructor(private http:HttpClient) {

   }

   getMenusByRole(){
    return this.http.get(environment.apiUrl + "Menu/getMenusByRole");
   }
   getMenuAccess(menuName:string){
    return this.http.get(environment.apiUrl + "Menu/getMenuAccess/"+menuName);
   }
}
