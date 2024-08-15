import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { ICategoryDto } from '../../Models/Category';
import { PaginationComponent } from "../pagination/pagination.component";
import { FilterPipe } from '../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, PaginationComponent,FilterPipe,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories!:ICategoryDto[];
  activeIdx = 1;
  textFilter = "";
  constructor(private _toast:ToastrService,private _category:CategoryService){

  }
  ngOnInit(): void {
    this._category.getCategories().subscribe({
      next:res=>{
        this.categories = res as ICategoryDto[];
      }
    })
  }

  addNewCategory(){

  }
  delete(item:ICategoryDto){

  }
  update(item:ICategoryDto){

  }
  pageIdxChanged(idx:number){
    this.activeIdx=idx;
  }
}

