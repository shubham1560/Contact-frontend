import { Injectable } from '@angular/core';
import { AuthserviceService } from '../authservice/authservice.service';
import { UrlserviceService } from '../urlservice.service';
import { UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private authService: AuthserviceService,
    private urlService: UrlserviceService,
    private httpService: HttpClient
  ) { }

  base_url = this.urlService.base_url;
  base_url_contact = `${this.base_url}api/v1/contact-us/`;

  headers = this.authService.getHeader()
  url;
  body;

  getContactUsList(){
    this.url = `${this.base_url_contact}get/`;
    return this.httpService.get(this.url, {headers: this.headers});
  }
}
