import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface MessageTable{
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  anything_else: string;
  phone_number: string;
}

export interface Preference{
  first_name: boolean;
  last_name: boolean;
  name: boolean;
  email: boolean;
  subject: boolean;
  message: boolean;
  anything_else: boolean;
  phone_number: boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor(
    private contactService: ContactService
  ) { }

  tableData: MessageTable[];
  data: MessageTable[];
  preference: Preference;
  displayedColumns: string[] ;
  columnsToDisplay: string[];
  displayField: any[];
  labelColumns;
  ngOnInit(): void {
    this.contactService.getContactUsList().subscribe(
      (response:any) => {
        // console.log("called");
        this.tableData = response.list;
        this.preference = response.preference[0];
        // console.log(response);
        var result = this.getPreferenceArray(this.preference)
        this.displayedColumns = result["backend_field"]
        this.labelColumns = result["display_field"]
      }
    )
  }

  getPreferenceArray(preference: Preference) : {} {
    var arr = [];
    var displayField = [];
    if (preference.anything_else == true){
      arr.push("anything_else");
      displayField.push("Anything Else");
    }
    if (preference.email == true){
      arr.push("email");
      displayField.push("Email");
    }
    if (preference.first_name == true){
      arr.push("first_name");
      displayField.push("First Name");
    }
    if (preference.last_name == true){
      arr.push("last_name");
      displayField.push("Last Name");
    }
    if(preference.message == true){
      arr.push("message");
      displayField.push("Message");
    }
    if(preference.name == true){
      arr.push("name");
      displayField.push("Name");
    }
    if(preference.phone_number == true){
      arr.push("phone_number");
      displayField.push("Phone Number");
    }
    if(preference.subject == true){
      arr.push("subject");
      displayField.push("Subject");
    }
    arr.push("sys_created_on");
    displayField.push("Message Timing")
    return {"backend_field": arr, "display_field": displayField};
  }
  

}
