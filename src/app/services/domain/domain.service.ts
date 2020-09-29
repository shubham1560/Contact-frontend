import { Injectable } from '@angular/core';
import { UrlserviceService } from '../urlservice.service';
import { AuthserviceService } from '../authservice/authservice.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  constructor(
    private urlService: UrlserviceService,
    private authService: AuthserviceService,
    private httpService: HttpClient
  ) { }

  base_url = this.urlService.base_url;
  base_url_domain = `${this.base_url}domain/v1/`;

  headers = this.authService.getHeader();
  url;
  body;

  getUserDomainDetails(){
    this.url = `${this.base_url_domain}domain/details/`;
    return this.httpService.get(this.url, {headers: this.headers});
  }


}
