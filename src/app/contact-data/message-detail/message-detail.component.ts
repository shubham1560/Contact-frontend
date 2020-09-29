import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomainService } from 'src/app/services/domain/domain.service';
import { PreferencesComponent } from '../preferences/preferences.component';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private domainService: DomainService,
    public dialog: MatDialog,
  ) { }

  preference;
  preferenceArray = []
  labelArray = []
  ngOnInit(): void {
    // console.log(this.data);
    this.domainService.getUserFormDetailPreference().subscribe(
      (response: any) => {
        this.preference = response;
        for (const property in response) {
          if (response[property] == true) {
            this.preferenceArray.push(property)
            this.labelArray.push(property.toUpperCase())
          }
        }
      }, error => {
        console.log(error);

      }
    )
  }

  changePreference() {
    const dialogRef = this.dialog.open(PreferencesComponent, {
      width: '320px',
      data: { preferences: this.preference, device_type: "DFD" }
      // data: { message: this.selectedMessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // console.log(result);
      if (result) {
        this.preference = result;
        this.preferenceArray = []
        this.labelArray = [];
        for (const property in result) {
          if (result[property] == true) {
            this.preferenceArray.push(property)
            this.labelArray.push(property.toUpperCase())
          }
        }
      }
      // this.animal = result;
    });

  }

}
