import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay, finalize, map } from 'rxjs';
import { BusyService } from './busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _busy = inject(BusyService);
  _busy.busy();
  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      _busy.idle();
    })
  );
};
