import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/services/authservice/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthserviceService,
  ) { }

  ngOnInit(): void {
  }


  logout(){
    this.authService.logout();
  }
}
