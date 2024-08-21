import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { requiredFileType } from '../../Validations/ImageFileValidtion';
import { ImageUploadComponent } from "../image-upload/image-upload.component";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategoryAdd, ICategoryDto } from '../../Models/Category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, ImageUploadComponent,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categoryForm!:FormGroup;
  currid:number = 0;
  category!:ICategoryDto;
  constructor(private _toast:ToastrService , private _category:CategoryService,
    @Inject(MAT_DIALOG_DATA) public data:any , private dialog:MatDialogRef<AddCategoryComponent>
  ){
    this.currid = data.currid;
    if(this.currid > 0 ){
    _category.getCategory(this.currid).subscribe({
      next:res=>{
        this.category = res as ICategoryDto;
        this.categoryForm = new FormGroup(
          {

            id : new FormControl(this.category.id),
            name: new FormControl(this.category.name ,[Validators.required , Validators.minLength(3)]),
            description: new FormControl(this.category.description),
            photoUrl: new FormControl(this.category.image),
            image:new FormControl(null, [Validators.required,requiredFileType('jpg')])
          }
        )
      }
    })
  }else{
    this.categoryForm = new FormGroup(
      {
        id : new FormControl(''),
        name: new FormControl('' ,[Validators.required , Validators.minLength(3)]),
        description: new FormControl(''),
        photoUrl: new FormControl(null),
        image:new FormControl(null, [Validators.required,requiredFileType('jpg')])
      }
    )
  }
  }
  ngOnInit(): void {

  }

  uploadFile(files:any){
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    this.categoryForm.patchValue({
        image: fileToUpload
      });
    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = (_event) => {
      this.categoryForm.patchValue({
        photoUrl : reader.result
      });
     };
  }
  submit(){
    const formData: FormData = new FormData();
    if(this.categoryForm.get("image")?.value){
      formData.append('image', this.categoryForm.get("image")?.value, this.categoryForm.get("image")?.value.name);
    }
    // else{
    //   formData.append('image', this.categoryForm.get("image")?.value, "");
    // }
    formData.append('name', this.categoryForm.get("name")?.value);
    formData.append('description', this.categoryForm.get("description")?.value);
    if(this.currid <= 0){
      this._category.addCategory(formData).subscribe({
        next:res=>{
          this._toast.success("added successfully" , "Success");
          this.close();
        }
      })
    }else{

      formData.append("id" , this.categoryForm.get("id")?.value);
      this._category.updateCategory(formData,this.currid).subscribe({
        next:res=>{
          this._toast.success("updated successfully" , "Success");
          this.close();
        }
      })
    }

    //console.log(cat);
  }

  close(){
    this.dialog.close();
  }

}
