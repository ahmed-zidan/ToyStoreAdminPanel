import { Component} from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../MaterialModule';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,LoginComponent,RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  dispalyName:string = "";
  constructor(private accountService:AccountService , private toastService:ToastrService){

  }
  getCurrentUser(){
    let user = this.accountService.getCurrentUser();
    if(user){
      this.dispalyName = user.displayName;
    }
    return user;
  }

}
