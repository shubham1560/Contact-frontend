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

  getContactUsList(start, message_type){
    this.url = `${this.base_url_contact}get/${start}/${message_type}/`;
    return this.httpService.get(this.url, {headers: this.headers});
  }

  changeUserDomainPreference(preference, device_type){
    this.url = `${this.base_url}domain_preference/v1/domain_preference/${device_type}/`;
    const body = preference;
    return this.httpService.post(this.url, body, {headers: this.headers})
  }

  markMessage(field, value, id){
    this.url = `${this.base_url_contact}change/`;
    const body = {
      field: field,
      value: value,
      id: id,
    }
    console.log(this.url)
    console.log(body)
    return this.httpService.post(this.url, body, {headers: this.headers});
  }

  changeUserDomainPreferenceWindow(field, value){
    this.url = `${this.base_url}domain_preference/v1/domain_preference/change/window/`;
    const body = {
      field: field,
      value: value
    }
    return this.httpService.post(this.url, body, {headers: this.headers});
  }

  deleteMessages(arr){
    this.url= `${this.base_url_contact}delete/`;
    const body = {
      ids: arr
    }
    return this.httpService.post(this.url, body, {headers: this.headers});
  }
}
