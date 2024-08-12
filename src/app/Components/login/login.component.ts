import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginDto, userDto, userInfo } from '../../Models/Account';
import { MaterialModule } from '../../MaterialModule';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  user!:LoginDto;
  constructor(private _account:AccountService , private _toast:ToastrService , private _router:Router){

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email:new FormControl('' , [Validators.required , Validators.email]),
      password:new FormControl('' , [Validators.required])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.user = this.loginForm.value as LoginDto;
      this._account.login(this.user).subscribe({
        next:res=>{
          const userInfo:userInfo = res as userInfo;
          this._account.setCurrentUser(userInfo);
        }
      })
    }
  }
}
