import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss'],
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    fb: FormBuilder, 
    router: Router,
    private snackBar: MatSnackBar
  ) { 
    super(true, fb, router)
  }

  ngOnInit(): void {
    super.onInit()
  }

   validateForm(): void {
    console.log('LdapAddComponent - validateForm')
    this.processLoadRunning = true;
    this.usersService.addUser(this.getUserFormControl()).subscribe(
      data=>{
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur ajouté!', 'X')
      },
      error=>{
        this.processValidateRunning = false;
        this.errorMessage = 'L\'utilisateur n\'existe pas!';
        this.snackBar.open('Utilisateur ajouté!', 'X')
      }
    )
  }

}