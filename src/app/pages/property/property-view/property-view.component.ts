import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.css']
})
export class PropertyViewComponent {
  @Input() property:any;
  constructor(public userService:UserService, public propertyService:PropertyService){}
  
}
