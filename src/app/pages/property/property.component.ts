import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { PropertyService } from './property.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  properties: any[] = [];
  nextPageNumber: number | null = null;
  private propertyDeletedSubscription: Subscription | undefined;

  constructor(private apiService: ApiService, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.loadProperties(1);
    this.propertyDeletedSubscription = this.propertyService.propertyDeleted.subscribe(
      id => {
        this.properties = [];
        this.loadProperties();
      }
    );
  }

  ngOnDestroy(): void {
    this.propertyDeletedSubscription?.unsubscribe();
  }

  loadProperties(pageNumber?: number): void {
    let apiUrl = 'property';
    if (pageNumber) {
      apiUrl += `?page=${pageNumber}`;
    }
    this.apiService.get(apiUrl).subscribe(
      (data) => {
        if (Array.isArray(this.properties)) {
          this.properties = [...this.properties, ...data.results];
        } else {
          this.properties = data.results;
        }

        this.nextPageNumber = this.getPageNumberFromUrl(data.next);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  loadNextPage(): void {
    if (this.nextPageNumber) {
      this.loadProperties(this.nextPageNumber);
    }
  }

  applyFilters(filters: any): void {
    let apiUrl = 'property';
    let isFirstFilter = true;
    for (const key in filters) {
      if (filters.hasOwnProperty(key) && filters[key]) {
        if (isFirstFilter) {
          apiUrl += `?${key}=${filters[key]}`;
          isFirstFilter = false;
        } else {
          apiUrl += `&${key}=${filters[key]}`;
        }
      }
    }

    this.properties = [];

    this.apiService.get(apiUrl).subscribe(
      (data) => {
        this.properties = data.results;
        this.nextPageNumber = this.getPageNumberFromUrl(data.next);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getPageNumberFromUrl(url: string | null): number | null {
    if (!url) {
      return null;
    }

    const params = new URLSearchParams(url.split('?')[1]);
    return Number(params.get('page'));
  }
}
