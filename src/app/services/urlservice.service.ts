import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlserviceService {

  constructor(
    private cookieService: CookieService,

  ) { }

  // base_url = "http://127.0.0.1:8000/";
  base_url = "https://contact-api-backend.herokuapp.com/"

  getUrl() {
    return this.base_url;
  }


  getHeader() {
    if (this.isLoggedIn()) {
      return this.getAuthenticationHeader();
    }
    return this.getUnauthenticatedHeader()
  }

  getUnauthenticatedHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  getAuthenticationHeader() {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    })
  }

  isLoggedIn(): boolean {
    if (this.cookieService.get('token')) {
      if (this.cookieService.get('token') == localStorage.getItem('token')) {
        return true;
      }
    }
    return false;
  }
}
