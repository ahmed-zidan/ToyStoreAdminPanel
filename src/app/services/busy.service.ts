import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(private _spinner:NgxSpinnerService) {

   }

   busy(){
    this._spinner.show(undefined,{
      type:'ball-scale-multiple',
      //bdColor:'rgpa(0,0,0,0.2)',
      color:'#333333',

    });
   }

   idle(){
    this._spinner.hide();
   }

}
