import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registrationForm: FormGroup;
  hide: boolean = true;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      // passwordGroup: this.fb.group({
      //   password: ['', [Validators.required]],
      //   confirm_password: ['', [Validators.required]]
      // }, {validators: passwordMatch}),
      full_name: ['', [Validators.required,]],
      company:['', [Validators.required,]]
    },)
  }

  register(){
    console.log("register")
  }
}
