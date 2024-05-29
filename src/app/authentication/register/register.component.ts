import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { ApiService } from 'src/app/service/api.service';
import { FormDataService } from 'src/app/service/formdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  profileForm: FormGroup;
  profileService: any;

  constructor(private formBuild: FormBuilder, private apiService:ApiService, private router:Router) {
    this.profileForm = this.formBuild.group({
      'name': ['', [Validators.maxLength(30), Validators.required]],
      'location': ['', [Validators.maxLength(50), Validators.required]],
      'image': [null, Validators.required],
        'username': ['', [Validators.required]],
        'first_name': ['', [Validators.required]],
        'last_name': ['', [Validators.required]],
        'password': ['', [Validators.required, Validators.minLength(8)]],
        'email': ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() { }

  onSubmit(): void {
    if (this.profileForm.valid) {

    
      this.apiService.post('user/register', FormDataService.formGrouptoData(this.profileForm)).subscribe(
        response => this.router.navigateByUrl('/property'),
        error =>{
          if(error.error.username){
            AlertService.alertInfo(error.error.username)
          }
          else{
            AlertService.alertDanger(error.error)
          }
        }
      )
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        image: file
      });
    }
  }
}