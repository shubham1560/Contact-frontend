import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  preferenceForm: FormGroup;
  emailControl = new FormControl(false);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contactService: ContactService
  ) { 
    this.preferenceForm = this.fb.group({
      email: [this.data.preferences["email"], ],
      first_name: [this.data.preferences["first_name"], ],
      last_name: [this.data.preferences["last_name"],],
      name: [this.data.preferences["name"], ],
      subject:[this.data.preferences["subject"],],
      message:[this.data.preferences["message"],],
      anything_else:[this.data.preferences["anything_else"],],
      phone_number:[this.data.preferences["phone_number"],]
    

    })
  }

  ngOnInit(): void {
    // console.log(this.data.preferences["email"])
    // this.preferenceForm = this.fb.group({
    // })

  }

  changePreference(){
    this.contactService.changeUserDomainPreference(this.preferenceForm.value).subscribe(
      (response:any)=>{
        // console.log(response);
      }
    )
    console.log(this.preferenceForm.value);
  }

}
