import { Component, effect, OnInit } from '@angular/core';
import { MaterialModule } from '../../MaterialModule';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';
import { ICategoryDto } from '../../Models/Category';
import { PaginationComponent } from "../pagination/pagination.component";
import { FilterPipe } from '../../Pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { animateLeft, animateRight } from '../../animations/animationFile';
import { menuAccess } from '../../Models/Menu';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule, PaginationComponent,FilterPipe,FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  animations:[animateLeft , animateRight]
})
export class CategoryComponent implements OnInit {
  categories!:ICategoryDto[];
  activeIdx = 1;
  textFilter = "";
  access!:menuAccess;
  constructor(private _toast:ToastrService,private _category:CategoryService,private _router:Router,
    private dialog:MatDialog,private _menu:MenuService
  ){
    effect(()=>{
      this.access = _menu._accessMenu();
      //console.log(this.access);
    })
  }
  ngOnInit(): void {
    this.refreshCategories();
  }

  refreshCategories(){
    this._category.getCategories().subscribe({
      next:res=>{
        this.categories = res as ICategoryDto[];
      }
    })
  }
  addOrUpdateCategory(currid:number){
    this.dialog.open(AddCategoryComponent,{
      width:'40%',
      enterAnimationDuration:'100ms',
      exitAnimationDuration:'100ms',
      data:{
        currid : currid
      }
    }).afterClosed().subscribe({
      next:res=>{
        this.refreshCategories();
      }
    });
  }
  delete(item:ICategoryDto){
    this._category.deleteCategory(item.id).subscribe({
      next:res=>{
        this._toast.success("category deleted successfully" , "deleted");
        this.refreshCategories();
      }
    })
  }
  update(item:ICategoryDto){

  }
  pageIdxChanged(idx:number){
    this.activeIdx=idx;
  }
}

