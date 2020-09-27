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
  sys_created_on: Date;
}

export interface Preference {
  first_name: boolean;
  last_name: boolean;
  name: boolean;
  email: boolean;
  phone_number: boolean;
  subject: boolean;
  message: boolean;
  anything_else: boolean;
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
  windowDefault;
  // end = this.start + this.chosenWindow;
  domain;
  deleteArray = [];
  isLoading = true;
  rowCount;
  messageType = "all";  // can be type important, read, unread, starred
  ngOnInit(): void {
    this.isLoading = true;
    this.contactService.getContactUsList(this.start, this.messageType).subscribe(
      (response: any) => {
        this.tableData = response.list;
        this.preference = response.preference[0];
        this.windowDefault = response.preference[0]["window"];
        this.rowCount = response.row_count;
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
          this.windowDefault = 50;
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


    if (preference.first_name == true) {
      arr.push("first_name");
      displayField.push("First Name");
    }

    if (preference.last_name == true) {
      arr.push("last_name");
      displayField.push("Last Name");
    }

    if (preference.name == true) {
      arr.push("name");
      displayField.push("Name");
    }

    if (preference.email == true) {
      arr.push("email");
      displayField.push("Email");
    }

    if (preference.phone_number == true) {
      arr.push("phone_number");
      displayField.push("Phone Number");
    }

    if (preference.subject == true) {
      arr.push("subject");
      displayField.push("Subject");
    }

    if (preference.message == true) {
      arr.push("message");
      displayField.push("Message");
    }

    if (preference.anything_else == true) {
      arr.push("anything_else");
      displayField.push("Anything Else");
    }

    arr.push("sys_created_on");

    displayField.push("Received on")
    return { "backend_field": arr, "display_field": displayField };
  }

  chooseWindow(value) {
    if (value != this.windowDefault) {
      this.contactService.changeUserDomainPreferenceWindow("window", value).subscribe(
        (response: any) => {
          console.log(response);
          this.windowDefault = value;
          // this.start = this.start + this.windowDefault;
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  openPreferenceModal() {

    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '250px',
      data: { preferences: this.preference }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      // this.getPreferenceArray(result);
      if (result) {
        this.preference = result;
        var result: any = this.getPreferenceArray(result);
        this.displayedColumns = result["backend_field"]
        this.labelColumns = result["display_field"]
      }
    });
  }


  selectAll(messages) {
    console.log(messages);
    console.log("select All");
    this.deleteArray = [];
    if (document.getElementById("mastercheck")["checked"] == true) {
      messages.forEach(element => {
        document.getElementById(element.id)["checked"] = true;
        this.deleteArray.push(element.id);
      });
    } else {
      messages.forEach(element => {
        document.getElementById(element.id)["checked"] = false;
        // this.deleteArray
      });
    }
    // console.log(this.deleteArray);
  }

  deletion(id) {
    console.log(id);
    if (document.getElementById(id)["checked"]) {
      this.deleteArray.push(id);
    }
    else {
      this.deleteArray = this.removeElement(this.deleteArray, id);
    }
    console.log(this.deleteArray);
  }

  nextPage() {
    this.start = this.start + this.windowDefault;
    this.ngOnInit();
  }

  previousPage() {
    this.start = this.start - this.windowDefault;
    this.ngOnInit();
  }

  mark(field, value, id) {
    // console.log(value, id);
    this.tableData.forEach(element => {
      if (element["id"] == id) {
        element[field] = value;
      }
    });
    this.contactService.markMessage(field, value, id).subscribe(
      (result: any) => {
        console.log(result);
      }, error => {
        console.log(error);
      }
    )
    // console.log("mark Important")
  }

  deleteSelected() {
    console.log(this.deleteArray);
  }

  changeMessageType(type) {
    if (this.messageType != type) {
      this.messageType = type;
      this.ngOnInit();
    }
  }

  dataType(value) {
    // return typeof(value);
    if (value) {
      if (value.includes("+05:30"))
        return "date";
    }
    return typeof (value)
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
