import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.css']
})
export class PropertyFilterComponent {
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();
  searchPlace: string = '';
  minBedrooms: number = 0;
  minBathrooms: number = 0;
  minFloors: number = 0;
  nearby:string = ''

  constructor() { }

  applyFilters() {
    const filters = {
      place: this.searchPlace,
      no_of_bedrooms: this.minBedrooms,
      no_of_bathrooms: this.minBathrooms,
      no_of_floor: this.minFloors,
      nearby:this.nearby
      
    };
    this.filtersChanged.emit(filters);
  }
}
