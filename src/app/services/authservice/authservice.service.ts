import { Injectable } from '@angular/core';
import { UrlserviceService } from '../urlservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(
    private urlService: UrlserviceService,
    private httpService: HttpClient,
    private cookieService: CookieService,
  ) { }

  base_url = this.urlService.getUrl();

  base_auth_url = `${this.base_url}auth/`;
  url;
  body:{};
  header:any;

  logout(){
    this.cookieService.delete('token');
    localStorage.removeItem('token');
    window.location.href = "welcome"
    // window.window.location.href = "welcome";
  }
  
  loginRoot(username, password) {
    const body = JSON.stringify({ "username": username, "password": password });
    const url = `${this.base_auth_url}token/get_token/`;
    this.url = url;
    this.body = body;
    this.header = this.getHeader();
    return this.httpService.post(url, body, { headers: this.header });
  }

  registerRoot(user){
    const registration_body = {
      "username": user["email"],
      "password": user["password"],
      "first_name": user["first_name"],
      "last_name": user["last_name"],
      "domain": user["domain"],
    }

    const body = JSON.stringify(registration_body);
    const url = `${this.base_auth_url}user/register/system/`;
    this.body = body;
    this.url = url;
    return this.httpService.post(url, body, { headers: this.getHeader() });
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
