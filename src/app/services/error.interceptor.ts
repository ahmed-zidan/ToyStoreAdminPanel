import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  const router = inject(Router)
  return next(req).pipe(
    catchError((error:any)=>{
      if(error){
        if(error.status == 401){ //unauthoriz ed
          router.navigate(["/welocme"]);
        }
        if(error.error && error.error.message){
          toast.error(error.error.message , 'error');
        }else{
          toast.error(error.message , 'error');
        }
      }
      return throwError(req);
    })
  )

};
