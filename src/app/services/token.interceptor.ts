import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from './account.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(AccountService);
  let token = user.getCurrentUser();
  if(token != undefined){
  let tokenReq = req.clone({
    setHeaders:{
      Authorization:'bearer '+token.token
    }
  })
  return next(tokenReq);
  }else{
    return next(req);
  }


};
