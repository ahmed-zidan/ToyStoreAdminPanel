
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { SizeService } from '../../services/size.service';
import { ColorService } from '../../services/color.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListNameAndId } from '../../Models/General';
import { Color, Product } from '../../Models/Product';
import { requiredFileType } from '../../Validations/ImageFileValidtion';
import { MaterialModule } from '../../MaterialModule';
import { animatePopUp } from '../../animations/animationFile';
import { ICategoryDto } from '../../Models/Category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  animations:[animatePopUp]
})
export class AddProductComponent implements OnInit {
  productForm!:FormGroup;
  sizes!:ListNameAndId[];
  colors!:Color[];
  currId:number = 0;
  categories!:ICategoryDto[];


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _dialog:MatDialogRef<AddProductComponent>,
  private _toast:ToastrService , private _product:ProductService , private _category:CategoryService,
private _size:SizeService , private _color:ColorService ){
  this.currId = data.id;
  this.productForm = new FormGroup(
    {
    id : new FormControl(0),
    name : new FormControl("" , [Validators.required , Validators.minLength(5)]),
    mainPrice : new FormControl("" ,[Validators.min(1)]),
    sellPrice : new FormControl("" , [Validators.min(1)]),
    categotyId : new FormControl("" , [Validators.min(1),Validators.required]),
    colorsData : new FormControl(),
    description : new FormControl(""),
    imageUrl : new FormControl(null),
    isNew : new FormControl(false),
    isSale : new FormControl(false),
    sizesData : new FormControl(),
    image : new FormControl(null , [Validators.required,requiredFileType('jpg')]),
    }
  )

  }
  ngOnInit(): void {

    this._color.getColors().subscribe({
      next:res=>{
        this.colors = res as Color[];
      }
    })
    this._size.getSizes().subscribe({
      next:res=>{
        this.sizes = res as ListNameAndId[];
      }
    })
    this._category.getCategories().subscribe({
      next:res=>{
        this.categories = res as ICategoryDto[];
      }
    })
    if(this.currId >0){
      this._product.getProduct(this.currId).subscribe({
        next:res=>{
          let product = res as Product;
          this.productForm = new FormGroup(
            {
            id : new FormControl(product.id),
            name : new FormControl(product.name),
            mainPrice : new FormControl(product.mainPrice),
            sellPrice : new FormControl(product.sellPrice),
            categotyId : new FormControl(product.categotyId),
            colors : new FormControl(product.colors),
            description : new FormControl(product.description),
            imageUrl : new FormControl(product.imageUrl),
            isNew : new FormControl(product.isNew),
            isSale : new FormControl(product.isSale),
            sizes : new FormControl(product.sizes),
            image : new FormControl(null , [Validators.required,requiredFileType('jpg')]),
            }
          )
        }
      })
    }
  }


  uploadFile(file:any){

  }

  submitForm(){

  }

  close(){

  }
}
