
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
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
  errors!:string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private _dialog:MatDialogRef<AddProductComponent>,
  private _toast:ToastrService , private _product:ProductService , private _category:CategoryService,
private _size:SizeService , private _color:ColorService ){
  this.currId = data.currid;
  this.productForm = new FormGroup(
    {
    id : new FormControl(0),
    name : new FormControl("" , [Validators.required , Validators.minLength(5)]),
    mainPrice : new FormControl("" ,[Validators.min(1) , Validators.required]),
    sellPrice : new FormControl("" , [Validators.min(1), Validators.required]),
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
            name : new FormControl(product.name , [Validators.required , Validators.minLength(5)]),
            mainPrice : new FormControl(product.mainPrice ,[Validators.min(1) , Validators.required]),
            sellPrice : new FormControl(product.sellPrice , [Validators.min(1), Validators.required]),
            categotyId : new FormControl(product.categotyId , [Validators.min(1),Validators.required]),
            colorsData : new FormControl(product.colors),
            description : new FormControl(product.description),
            imageUrl : new FormControl(product.imageUrl),
            isNew : new FormControl(product.isNew),
            isSale : new FormControl(product.isSale),
            sizesData : new FormControl(product.sizes),
            image : new FormControl(null , [Validators.required,requiredFileType('jpg')]),
            })
        }
      })
    }
  }


  uploadFile(files:any){

    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.productForm.patchValue({
      image: fileToUpload
      });
    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = (_event) => {
      this.productForm.patchValue({
        imageUrl : reader.result
      });
     };
  }

  submitForm(){
    const formData: FormData = new FormData();
    if(this.productForm.get("image")?.value){
      formData.append('image', this.productForm.get("image")?.value, this.productForm.get("image")?.value.name);
    }

    formData.append('name', this.productForm.get("name")?.value);
    formData.append('description', this.productForm.get("description")?.value);
    formData.append('mainPrice', this.productForm.get("mainPrice")?.value);
    formData.append('sellPrice', this.productForm.get("sellPrice")?.value);
    formData.append('categotyId', this.productForm.get("categotyId")?.value);
    formData.append('colorId', this.productForm.get("colorsData")?.value);
    formData.append('sizeId', this.productForm.get("sizesData")?.value);
    formData.append('isSale', this.productForm.get("isSale")?.value);
    formData.append('isNew', this.productForm.get("isNew")?.value);
    if(this.currId <= 0){
      this._product.addProduct(formData).subscribe({
        next:res=>{
          this._toast.success("added successfully" , "Success");
          this.close();
        },error:err=>{
          if(err.error && err.error.errors){
            this.errors = err.error.errors;
          }
        }
      })
    }else{
      formData.append("id" , this.productForm.get("id")?.value);
      this._product.updateProduct(this.currId,formData).subscribe({
        next:res=>{
          this._toast.success("updated successfully" , "Success");
          this.close();
        },error:err=>{
          if(err.error && err.error.errors){
            this.errors = err.error.errors;
          }
        }
      })
    }
  }

  close(){

  }
}
