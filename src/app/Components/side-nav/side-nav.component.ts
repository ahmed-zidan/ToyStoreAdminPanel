import { Component, effect, OnInit} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../MaterialModule';
import { LoginComponent } from '../login/login.component';
import { MenuService } from '../../services/menu.service';
import { Menu, menuAccess } from '../../Models/Menu';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,LoginComponent,RouterLink,NgxSpinnerModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',

})
export class SideNavComponent implements OnInit {
  dispalyName:string = "";
  menus!:Menu[];
  constructor(private accountService:AccountService , private toastService:ToastrService,
    private menuService:MenuService , private router:Router
  ){
    effect(()=>{
      let name = this.menuService._desplayName();
      let menus = this.menuService._menus();
      if(name.length > 0 && menus.length >0){
        this.dispalyName = this.menuService._desplayName();
        this.menus = this.menuService._menus();
      }
    })
  }
  ngOnInit(): void {
    if(this.getCurrentUser()){
      this.menuService.getMenusByRole().subscribe({
        next:res=>{
          this.menus = res as Menu[];
        }
      })
    }
  }
  getCurrentUser(){
    let user = this.accountService.getCurrentUser();
    if(user){
      this.dispalyName = user.displayName;
    }
    return user;
  }

  logout(){
    this.dispalyName = "";
    this.router.navigate(["/login"]);
  }

}
