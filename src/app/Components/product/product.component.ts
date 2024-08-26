import { Component, OnInit } from '@angular/core';
import { ProductList, productPagination } from '../../Models/Product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { MaterialModule } from '../../MaterialModule';
import { animateLeft, animatePopUp, animateRight } from '../../animations/animationFile';
import { ListNameAndId } from '../../Models/General';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { PaginationComponent } from '../pagination/pagination.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule,FormsModule,FilterPipe,PaginationComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  animations:[animateLeft,animateRight,animatePopUp]
})
export class ProductComponent implements OnInit {

productSearch!:productPagination;
products!:ProductList;
categories!:ListNameAndId[];
activeCatId = 1;
textFilter = "";
constructor(private _toast:ToastrService , private _product:ProductService,
  private _category:CategoryService,private dialog:MatDialog
){

}

ngOnInit(): void {
  this.productSearch = {categoryId:this.activeCatId,colors:[],sizes:[],pageIdx:0,pageSize:10,search:'',sorting:'',minPrice:0,maxPrice:580};
  this.fillProducts();
  this.fillCategories();
}

fillProducts(){
  this._product.getProducts(this.productSearch).subscribe({
    next:res=>{
      this.products = res as ProductList;
      console.log(this.products);
    }
  })
}

fillCategories(){
  this._category.getCategoriesNameAndIds().subscribe({
    next:res=>{
      this.categories = res as ListNameAndId[];
      if(this.categories.length > 0){
        this.activeCatId = this.categories[0].id;
      }
    }
  })
}

addNewProduct(currId = 0){
 this.openProductItem(currId);
}

updateData(id:number){
  this.openProductItem(id);
}

openProductItem(id:number){
  this.dialog.open(AddProductComponent,{
    width:'60%',
    enterAnimationDuration:'100ms',
    exitAnimationDuration:'100ms',
    data:{
      currid : id
    }
  }).afterClosed().subscribe({
    next:res=>{
      //this.refreshCategories();
    }
  });
}

pageIdxChanged(event:number){

}

categoryChanged(id:any){
  this.productSearch.categoryId = id;
  this.fillProducts();
}



}
