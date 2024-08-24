
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _dialog:MatDialogRef<AddProductComponent>,
  private _toast:ToastrService , private _product:ProductService , private _category:CategoryService ){

  }
}
