import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreferencesComponent } from '../preferences/preferences.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { MessageDetailComponent } from '../message-detail/message-detail.component'

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
        this.preference = response.preference[0] || {
          anything_else: true,
          email: true,
          first_name: true,
          id: 5,
          last_name: true,
          message: true,
          name: true,
          phone_number: true,
          subject: true,
          window: 50
        };
        this.windowDefault = this.preference["window"];
        this.rowCount = response.row_count;
        this.domain = this.preference
        var result = this.getPreferenceArray(this.preference);
        this.displayedColumns = result["backend_field"]
        this.labelColumns = result["display_field"]
        this.isLoading = false;
      }
    )
    console.log(this);
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
          // console.log(response);
          this.windowDefault = value;
          this.start = 0;
          this.ngOnInit();
        }, error => {
          // console.log(error);
        }
      )
    }
  }

  openPreferenceModal() {

    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '250px',
      data: { preferences: this.preference, device_type: "DLD" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preference = result;
        var result: any = this.getPreferenceArray(result);
        this.displayedColumns = result["backend_field"]
        this.labelColumns = result["display_field"]
      }
    });
  }


  selectAll(messages) {
    this.deleteArray = [];
    if (document.getElementById("mastercheck")["checked"] == true) {
      messages.forEach(element => {
        document.getElementById(element.id)["checked"] = true;
        this.deleteArray.push(element.id);
      });
    } else {
      messages.forEach(element => {
        document.getElementById(element.id)["checked"] = false;
      });
    }
    // console.log(this.deleteArray);
  }

  deletion(id) {
    if (document.getElementById(id)["checked"]) {
      this.deleteArray.push(id);
    }
    else {
      this.deleteArray = this.removeElement(this.deleteArray, id);
    }
    // console.log(this.deleteArray);
  }

  nextPage() {
    this.start = this.start + this.windowDefault;
    this.ngOnInit();
  }

  previousPage() {
    this.start = this.start - this.windowDefault;
    this.ngOnInit();
  }


  selectedMessage;
  mark(field, value, id) {
    this.tableData.forEach(element => {
      if (element["id"] == id) {
        element[field] = value;
        this.selectedMessage = element;
      }
    });
    this.contactService.markMessage(field, value, id).subscribe(
      (result: any) => {
        // console.log(result);
      }, error => {
        // console.log(error);
      }
    )
    if(field=="read"){
      const dialogRef = this.dialog.open(MessageDetailComponent, {
        width: '100%',
        data: { message: this.selectedMessage}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
        // this.animal = result;
      });

    }
  }

  deleteSelected() {
    // console.log(this.deleteArray);

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: { length: this.deleteArray.length}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if (this.deleteArray.length > 0) {
          this.contactService.deleteMessages(this.deleteArray).subscribe(
            (response: any) => {
              this.deleteArray = [];
              this.ngOnInit();
            }, error => {
              this.ngOnInit();
              this.deleteArray = [];
            }
          )
        }
      }
    });

    
  }

  changeMessageType(type) {
    if (this.messageType != type) {
      this.start = 0;
      this.messageType = type;
      this.ngOnInit();
    }
  }

  dataType(value) {
    if (value) {
      if (value.includes("+05:30"))
        return "date";
    }
    return typeof (value)
  }

  removeElement(arr, value) {
    const array = arr;
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
