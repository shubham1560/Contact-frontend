import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreferencesComponent } from '../preferences/preferences.component';


export interface MessageTable {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  anything_else: string;
  phone_number: string;
}

export interface Preference {
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
    private contactService: ContactService,
    public dialog: MatDialog,
  ) { }

  tableData: MessageTable[];
  data: MessageTable[];
  preference: Preference;
  displayedColumns: string[];
  columnsToDisplay: string[];
  displayField: any[];
  labelColumns;
  start = 0
  chosenWindow = 10;
  end = this.start + this.chosenWindow;
  domain;
  deleteArray = [];
  isLoading = true;
  ngOnInit(): void {
    this.isLoading = true;
    this.contactService.getContactUsList(this.start, this.end).subscribe(
      (response: any) => {
        this.tableData = response.list;
        this.preference = response.preference[0];
        if (!this.preference) {
          this.preference = {
            first_name: true,
            last_name: true,
            anything_else: true,
            email: true,
            message: true,
            name: true,
            phone_number: true,
            subject: true
          }
        }
        this.domain = this.preference
        var result = this.getPreferenceArray(this.preference);
        this.displayedColumns = result["backend_field"]
        this.labelColumns = result["display_field"]
        this.isLoading = false;
      }
    )
    console.log(this);

    // console.log(this);
  }

  getPreferenceArray(preference: Preference): {} {
    var arr = [];
    var displayField = [];

    if (preference.anything_else == true) {
      arr.push("anything_else");
      displayField.push("Anything Else");
    }
    if (preference.email == true) {
      arr.push("email");
      displayField.push("Email");
    }
    if (preference.first_name == true) {
      arr.push("first_name");
      displayField.push("First Name");
    }
    if (preference.last_name == true) {
      arr.push("last_name");
      displayField.push("Last Name");
    }
    if (preference.message == true) {
      arr.push("message");
      displayField.push("Message");
    }
    if (preference.name == true) {
      arr.push("name");
      displayField.push("Name");
    }
    if (preference.phone_number == true) {
      arr.push("phone_number");
      displayField.push("Phone Number");
    }
    if (preference.subject == true) {
      arr.push("subject");
      displayField.push("Subject");
    }
    arr.push("sys_created_on");

    displayField.push("Message Timing")
    return { "backend_field": arr, "display_field": displayField };
  }

  chooseWindow(value) {
    this.chosenWindow = value;
    // console.log("called");
    this.end = this.start + this.chosenWindow

    this.ngOnInit();
  }

  openPreferenceModal() {

    // Get the domain from the user
    // console.log("called");
    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '250px',
      data: { preferences: this.preference }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      // this.getPreferenceArray(result);
      this.preference = result;
      var result: any = this.getPreferenceArray(result);
      this.displayedColumns = result["backend_field"]
      this.labelColumns = result["display_field"]
    });
  }


  selectAll(){
    console.log("select All");
  }

  deletion(id) {
    console.log(id);
    if (document.getElementById(id)["checked"]) {
      this.deleteArray.push(id);

    }
    else {
      this.deleteArray = this.removeElement(this.deleteArray,id);
    }

    console.log(this.deleteArray);
  }

  removeElement(arr, value) {
    const array = arr;
    // console.log(array);
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
