import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice/authservice.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
  ) { }

  user;
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      full_name: ['', [Validators.required,]],
      company: ['', [Validators.required,]]
    })
  }

  register() {
    this.user = {};
    this.user["email"] = this.registrationForm.value["email"];
    this.user["first_name"] = this.registrationForm.value["full_name"].split(" ")[0];
    this.user["last_name"] = this.registrationForm.value["full_name"].replace(this.user["first_name"] + " ", '').replace(this.user["first_name"], '');
    this.user["password"] = this.registrationForm.value["password"];
    this.user["domain"] = this.registrationForm.value["company"];
    this.authService.registerRoot(this.user).subscribe(
      (response: any) => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    )
    console.log("register")
  }
}
