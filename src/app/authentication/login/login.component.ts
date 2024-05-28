import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuild:FormBuilder, private apiService:ApiService, private userService:UserService, private router:Router){
    this.checkLogin()
  }
  loginForm: FormGroup = this.formBuild.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required, Validators.minLength(8)]]
  })

  checkLogin(){
    if(this.userService.getUser()){
      this.router.navigateByUrl('/property')
    }
  }
  onSubmit() {
    if(this.loginForm.valid){
      this.apiService.post('user/login', this.loginForm.value).subscribe(
        (data)=> {
          this.router.navigateByUrl('/property')
          this.userService.addUser(data.token)
        },
        (error)=> AlertService.alertDanger(error.message)
      )
    }
  }
}
