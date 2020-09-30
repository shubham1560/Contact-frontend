import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit {

  constructor(
    private domainService: DomainService,
  ) { }

  domainDetails;
  isLoading = true;

  ngOnInit(): void {
    this.domainService.getUserDomainDetails().subscribe(
      (response:any)=>{
        this.isLoading = false;
        console.log(response);
        this.domainDetails = response;
      }
    )
  }

}
