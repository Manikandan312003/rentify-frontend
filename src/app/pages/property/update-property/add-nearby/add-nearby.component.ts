import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-nearby',
  templateUrl: './add-nearby.component.html',
  styleUrls: ['./add-nearby.component.css']
})
export class AddNearbyComponent {
  constructor(private apiService:ApiService, private formBuilder:FormBuilder){}
  @Output() refresh = new EventEmitter()
  nearbyForm:FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    location: ['', Validators.required]
  })

  addNearby(){
    this.apiService.post('nearby/', this.nearbyForm.value).subscribe(
      data => {
        AlertService.alertSuccess('Added successfully')
        this.refresh.emit();
      }
    )
  }
}
