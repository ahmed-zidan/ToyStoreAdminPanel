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
import { checkAccessGuard } from './Gaurds/check-access.guard';

export const routes: Routes = [

  {path:"" , component:WelcomeComponent},
  {path:"login" , component:LoginComponent},
  {path:"welcome" , component:WelcomeComponent},
  {path:"Product" , component:ProductComponent , canActivate:[checkAccessGuard]},
  {path:"Category" , component:CategoryComponent,canActivate:[checkAccessGuard]},
  {path:"UserManager" , component:UserManagerComponent,canActivate:[checkAccessGuard]},
  {path:"RoleManager" , component:RoleManagerComponent,canActivate:[checkAccessGuard]},
  {path:"MenuManager" , component:MenuManagerComponent,canActivate:[checkAccessGuard]},
  {path:"Home" , component:HomeComponent,canActivate:[checkAccessGuard]},
  {path:"Category/AddCategory" , component:AddCategoryComponent,canActivate:[checkAccessGuard]},
  {path:"**" , component:WelcomeComponent}

];
