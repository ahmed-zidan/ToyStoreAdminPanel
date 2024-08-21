import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from '../services/menu.service';
import { menuAccess } from '../Models/Menu';

export const checkAccessGuard: CanActivateFn = (route, state) => {
  let taost = inject(ToastrService);
  let menuService = inject(MenuService);
  let router = inject(Router);
  //let token = JSON.parse(localStorage.getItem('token')as string) as UserLoginResDto;
  let menuName = '';
  if(route.url.length > 0){
    menuName = route.url[0].path as string;
  }

  if(menuName != '' &&menuName != 'welcome' ){
    //let roleAcc = new menuAccess(token.userRole,menuName);
    menuService.getMenuAccess(menuName).subscribe({
      next:res=>{
        let out = res as menuAccess;
        if(out.haveView){
          menuService._accessMenu.set(out);
          return true;
        }else{
          taost.warning("Unauthorized access");
          router.navigate(['/welcome']);
          return false;
        }

      },error:err=>{
        console.log(err);
        return false;
      }
    })
    //taost.warning("Unauthorized access");
    return true;
  }else{
    return true;
  }
};
