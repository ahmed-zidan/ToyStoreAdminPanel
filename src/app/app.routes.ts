import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { ProductComponent } from './Components/product/product.component';
import { CategoryComponent } from './Components/category/category.component';
import { UserManagerComponent } from './Components/user-manager/user-manager.component';
import { RoleManagerComponent } from './Components/role-manager/role-manager.component';
import { MenuManagerComponent } from './Components/menu-manager/menu-manager.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';

export const routes: Routes = [

  {path:"" , component:WelcomeComponent},
  {path:"login" , component:LoginComponent},
  {path:"welcome" , component:WelcomeComponent},
  {path:"Product" , component:ProductComponent},
  {path:"Category" , component:CategoryComponent},
  {path:"UserManager" , component:UserManagerComponent},
  {path:"RoleManager" , component:RoleManagerComponent},
  {path:"MenuManager" , component:MenuManagerComponent},
  {path:"Home" , component:HomeComponent},
  {path:"Category/AddCategory" , component:AddCategoryComponent},
  {path:"**" , component:WelcomeComponent}

];
