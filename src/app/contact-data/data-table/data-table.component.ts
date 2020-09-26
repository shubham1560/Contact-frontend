import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor(
    private contactService: ContactService
  ) { }

  tableData;
  ngOnInit(): void {
    this.contactService.getContactUsList().subscribe(
      (response:any) => {
        // console.log("called");
        this.tableData = response;
        // console.log(response);
      }
    )
  }

}
