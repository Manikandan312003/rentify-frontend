import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { ApiService } from './service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rentify';
  constructor(public userService:UserService, public apiService:ApiService, private router:Router){

  }

  logout(){
    this.userService.logout()
    this.router.navigateByUrl('login')
  }
}
