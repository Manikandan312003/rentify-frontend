import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
    propertyDeleted: EventEmitter<number> = new EventEmitter<number>();
  constructor(private apiService:ApiService) { }
  deleteProperty(id:number){
    this.apiService.delete(`property/${id}`).subscribe(
        data => this.propertyDeleted.emit(id),
        error => console.error(error)
    )
  }
}
