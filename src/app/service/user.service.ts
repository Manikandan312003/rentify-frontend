import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any=null;
  constructor(private apiService: ApiService) {
    this.setUserFromStorage()
  }

  setUser(user: any) {
    this.user = user
  }

  getUser() {
    return this.user;
  }
  getToken() {
    return localStorage.getItem('token')
  }
  getUserfromToken(token: string): Observable<any> {
    this.apiService.setToken(token)
    return this.apiService.get('user/me')
  }

  setUserFromStorage() {
    const token = this.getToken()
    if (token) {
      this.getUserfromToken(token).subscribe(
        user => this.user = user,
        err => console.error(err)
      )
    }
  }

  addUser(token:string){
    localStorage.setItem('token', token)
    this.getUserfromToken(token)
  }

  logout(){
    localStorage.removeItem('token')
    this.setUser(null);
  }

}
