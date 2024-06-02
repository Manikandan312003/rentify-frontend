import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';
import { ApiService } from 'src/app/service/api.service';
import { PropertyService } from '../property.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  constructor(private apiService: ApiService, private acRouter:ActivatedRoute, public userService:UserService,public propertyService:PropertyService) {
    acRouter.params.subscribe(params => {
      if(params['id']){
        this.loadProperties(params['id'])
      }
    });
   }
  property:any;
  loadProperties(id: number): void {
    let apiUrl = `property/${id}`;
    

    this.apiService.get(apiUrl).subscribe(
      (data) => {
        this.property = data;
      },
      (error) => {
        AlertService.alertDanger(error.message)
      }
    );
  }

  addLike(){
    this.apiService.post('like', {'property': this.property.id}).subscribe(
      (data) => this.loadProperties(this.property.id),
      (err) => {
        if(err.status==400){
          AlertService.alertInfo(err.error)
        }
      }
    )
  }
  addInterest(){
    this.apiService.post('interest', {'property': this.property.id}).subscribe(
      data => AlertService.alertInfo('The Seller detail have been share to email'),
      (err) => {
        if(err.status==400){
          AlertService.alertInfo(err.error)
        }
      }
    )
    
  }
}
