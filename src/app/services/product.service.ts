import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productPagination } from '../Models/Product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

  }

  getProducts(pagination:productPagination){
    return this.http.post(environment.apiUrl + "Product/getAllProducts",pagination)
  }

  getProduct(id:number){
    return this.http.get(environment.apiUrl + "Product/getProduct/"+id)
  }

  addProduct(productForm:any){
    return this.http.post(environment.apiUrl + "Product/addProduct",productForm)
  }
  updateProduct(productForm:any){
    return this.http.put(environment.apiUrl + "Product/updateProduct",productForm)
  }

  deleteProduct(id:number){
    return this.http.delete(environment.apiUrl + "Product/deleteProduct/"+id)
  }
}
