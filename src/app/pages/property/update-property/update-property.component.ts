

import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { ApiService } from 'src/app/service/api.service';
import { FormDataService } from 'src/app/service/formdata.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent {
  propertyForm: FormGroup = this.formBuilder.group({
    place: ['', Validators.required],
    area: ['', Validators.required],
    image: [null, Validators.required],
    imageUrl: ['', Validators.required],
    no_of_bedrooms: ['', Validators.required],
    no_of_bathrooms: ['', Validators.required],
    no_of_floor: ['', Validators.required]
  });

  isEditing = false;
  propertyId!: number;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService,public userService:UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing = true;
        this.propertyId = params['id'];
        this.fetchProperty();
      }
    });
  }

  fetchProperty() {
    this.apiService.get(`property/${this.propertyId}`).subscribe(
      data => {
        const property = data;
        if(property.profile!=this.userService.getUser().id){
          AlertService.alertInfo('You have no permission')
          this.router.navigateByUrl('/property')
        }
        this.propertyForm.patchValue({
          'place': property.place,
          'area': property.area,
          'no_of_bedrooms': property.no_of_bedrooms,
          'no_of_bathrooms': property.no_of_bathrooms,
          'no_of_floor': property.no_of_floor,
          'image': property.image,
          'imageUrl': property.image
        });
      }
    );
  }

  submit() {
    if (this.isEditing) {
      if (!(this.propertyForm.controls['image'].value instanceof File)) {
        this.propertyForm.removeControl('image')
      }
      this.apiService.patch(`property/${this.propertyId}/`, FormDataService.formGrouptoData(this.propertyForm)).subscribe(
        (data) => {
          this.router.navigate(['/property', this.propertyId]);
          AlertService.alertSuccess('Successfully edited')
        },
        (err) => AlertService.alertDanger(err.error.detail)
      );
    } else if (this.propertyForm.valid) {
      this.apiService.post(`property/`, FormDataService.formGrouptoData(this.propertyForm)).subscribe(
        data => {
          this.propertyForm.reset()
          AlertService.alertSuccess('Successfully Added')
        },
        err => AlertService.alertDanger(err.error.detail)
      );
    }
    else{
      AlertService.alertDanger('Invalid details')
    }
  }


  uploadFile(event: any, control: any, fileName: any = null) {
    const file = event.target.files[0];
    control.patchValue(file);

    if (fileName) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        fileName.patchValue(reader.result);
      };
    }
  }
}
