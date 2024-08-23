import { Component, OnInit } from '@angular/core';
import { ProductList, productPagination } from '../../Models/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

productSearch!:productPagination;
products!:ProductList;

constructor(private _toast:ToastrService){

}

ngOnInit(): void {
  throw new Error('Method not implemented.');
}


}
