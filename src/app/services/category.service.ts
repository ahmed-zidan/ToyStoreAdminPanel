import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryAdd, ICategoryDto } from '../Models/Category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(category:FormData){
    return this.http.post(environment.apiUrl + "Category/addCategory" , category);
  }

  updateCategory(category:FormData,id:number){
    return this.http.put(environment.apiUrl + "Category/updateCategory/"+id , category);
  }

  deleteCategory(id:number){
    return this.http.delete(environment.apiUrl + "Category/deleteCategory/"+id);
  }
  getCategories(){
    return this.http.get(environment.apiUrl + "Category/getAll");
  }

  getCategoriesNameAndIds(){
    return this.http.get(environment.apiUrl + "Category/getCategoriesNamesAndId");
  }

  getCategory(id:number){
    return this.http.get(environment.apiUrl + "Category/getCategory/"+id);
  }


}
