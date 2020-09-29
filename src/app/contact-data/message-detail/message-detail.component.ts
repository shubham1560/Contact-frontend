import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomainService } from 'src/app/services/domain/domain.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private domainService: DomainService
  ) { }

  // preference;
  preferenceArray = []
  labelArray = []
  ngOnInit(): void {
    // console.log(this.data);
    this.domainService.getUserFormDetailPreference().subscribe(
      (response:any) =>{
        // this.preference = response;
        for (const property in response) {
          if(response[property] == true){
            this.preferenceArray.push(property)
            this.labelArray.push(property.toUpperCase())
          }
        }
      }, error => {
        console.log(error);
        
      }
    )
  }

}
