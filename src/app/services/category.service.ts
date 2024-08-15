import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoryAdd, ICategoryDto } from '../Models/Category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(category:ICategoryAdd){
    return this.http.post(environment.apiUrl + "Category/addCategory" , category);
  }

  updateCategory(category:ICategoryDto){
    return this.http.put(environment.apiUrl + "Category/updateCategory" , category);
  }

  deleteCategory(id:number){
    return this.http.delete(environment.apiUrl + "Category/updateCategory/"+id);
  }
  getCategories(){
    return this.http.get(environment.apiUrl + "Category/getAll");
  }

  getCategory(id:number){
    return this.http.get(environment.apiUrl + "Category/getCategory/"+id);
  }

}
