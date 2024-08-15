import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { requiredFileType } from '../../Validations/ImageFileValidtion';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MaterialModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  categoryForm!:FormGroup;
  constructor(private _toast:ToastrService , private _category:CategoryService){

  }
  ngOnInit(): void {
    this.categoryForm = new FormGroup(
      {
        id : new FormControl(''),
        name: new FormControl('' ,[Validators.required , Validators.minLength(3)]),
        description: new FormControl(''),
        image:new FormControl(null, [Validators.required,requiredFileType('png')])
      }
    )
  }

  submit(){

  }

}
