import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'
import { AuthserviceService } from 'src/app/services/authservice/authservice.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  signingIn = false;
  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private authService: AuthserviceService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login(){
    this.signingIn = true;
    this.authService.loginRoot(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(
      (response:any)=>{
        this.cookieService.set('token', response.token);
        // this.cookieService.zzz
        localStorage.setItem('token', response.token);
        window.location.href="dashboard";
        this.signingIn = false;
        // console.log(response);
      }, error=>{
        this.signingIn = false;
      }
    )
    // console.log(this.loginForm);
  }

}
