import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000';
  
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.apiUrl = "https://rentify-production.up.railway.app"
   }

  getApiUrl() {
    return this.apiUrl;
  }

  getImageUrl(imageEndpoint:string){
    return this.apiUrl + imageEndpoint;
  }

  getBackendUrl(endpoint: string) {
    return `${this.apiUrl}/${endpoint}`;
  }

  setToken(token: string) {
    this.headers = this.headers.set('Authorization', `token ${token}`);
  }
  
  get(endpoint: string, headers: HttpHeaders|any = this.headers): Observable<any> {
    const backendUrl = this.getBackendUrl(endpoint);
    return this.http.get(backendUrl, { headers });
  }

  post(endpoint: string, data: any, headers: HttpHeaders|any = this.headers): Observable<any> {
    const backendUrl = this.getBackendUrl(endpoint);
    return this.http.post(backendUrl, data, { headers });
  }

  put(endpoint: string, data: any, headers: HttpHeaders|any = this.headers): Observable<any> {
    const backendUrl = this.getBackendUrl(endpoint);
    return this.http.put(backendUrl, data, { headers });
  }

  delete(endpoint: string, headers: HttpHeaders|any = this.headers): Observable<any> {
    const backendUrl = this.getBackendUrl(endpoint);
    return this.http.delete(backendUrl, { headers });
  }

  patch(endpoint: string, data: any, headers: HttpHeaders|any = this.headers): Observable<any> {
    const backendUrl = this.getBackendUrl(endpoint);
    return this.http.patch(backendUrl, data, { headers });
  }
}
