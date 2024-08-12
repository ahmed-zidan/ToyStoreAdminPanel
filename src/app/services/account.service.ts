import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto, RegisterDto, userDto, userInfo } from '../Models/Account';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem("userInfo") as string) as userInfo;
  }

  setCurrentUser(user:userInfo){
    return localStorage.setItem("userInfo",JSON.stringify(user));
  }


  login(user:LoginDto){
    return this.http.post(environment.apiUrl + "Account/login",user);
  }

  register(user:RegisterDto){
    return this.http.post(environment.apiUrl +"Account/register" , user);
  }

  getUsers(){
    return this.http.get(environment.apiUrl +"Account/getAllUsers");
  }

  getUser(id:string){
    return this.http.get(environment.apiUrl +"Account/getUser");
  }

  updateUser(user:userDto){
    return this.http.post(environment.apiUrl +"Account/updateUser" , user);
  }

}
