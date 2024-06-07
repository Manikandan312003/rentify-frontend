import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.css']
})
export class PropertyFilterComponent {
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
  searchPlace: string = ''
  area: string = ''
  min_bedrooms: number | undefined
  equal_bedrooms: number | undefined
  max_bedrooms: number | undefined
  min_bathrooms: number | undefined
  equal_bathrooms: number | undefined
  max_bathrooms: number | undefined
  min_floor: number | undefined
  equal_floor: number | undefined
  max_floor: number | undefined
  min_likes: number | undefined
  equal_likes: number | undefined
  max_likes: number | undefined
  nearbyName: string = ''
  nearbyType:string=''
  constructor() { }

  applyFilters() {
    const filters = {
      area: this.area,
      nearby_name: this.nearbyName,
      nearby_type: this.nearbyType,
      place:this.searchPlace,

      min_no_of_bedrooms: this.min_bedrooms,
      equal_no_of_bedrooms: this.equal_bedrooms,
      max_no_of_bedrooms: this.max_bedrooms,

      min_no_of_bathrooms: this.min_bathrooms,
      equal_no_of_bathrooms: this.equal_bathrooms,
      max_no_of_bathrooms: this.max_bathrooms,

      min_no_of_floor: this.min_floor,
      equal_no_of_floor: this.equal_floor,
      max_no_of_floor: this.max_floor,

      min_no_of_likes: this.min_likes,
      equal_no_of_likes: this.equal_likes,
      max_no_of_likes: this.max_likes,


    };
    this.filtersChanged.emit(filters);
  }
}
