import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  processRunning = false;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  errorMessage ="";

  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private authenticationService : AuthenticationService,
    public router : Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nomComplet: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field : string){
    return (
      (!this.form.get(field).valid && this.form.get(field).touched ||
      (this.form.get(field).untouched && this.formSubmitAttempt))
    );  
  }

  onSubmit(){
    if(this.form.valid){
      this.processRunning = true;
      console.log( this.form.get('nomComplet').value,  this.form.get('password').value, ),
      this.authenticationService.loginWithRole(
        this.form.get('nomComplet').value,
        this.form.get('password').value,
        'ROLE_SUPER_ADMIN'
      ).subscribe(()=>{
        if(AuthenticationService.isLoggedIn()){
          console.log(this.authenticationService.redirectUrl)
          this.processRunning = false;
          //redirect to 'users/list'
          this.router.navigate([this.authenticationService.redirectUrl]);
        } else {
          throw new Error();
        }
      }, (HttpErrorResponse)=> {
        this.processRunning = false;
        this.snackBar.open('Login ou mot de passe invalide !', 'X');
      }
      );
    }
    this.formSubmitAttempt = true;
  }

}
