import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']

})

export class LdapEditComponent extends LdapDetailComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    fb: FormBuilder,
    router: Router,
    private snackBar: MatSnackBar
  ) {
    super(false, fb, router);
  }

  ngOnInit(): void {
    super.onInit();
    this.getUser(); 
  }


  validateForm():void {
    console.log('LdapEditComponet - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFormControl()).subscribe(
      data => {
        console.log(data);
        this.processValidateRunning = false;
        this.errorMessage ='';
        this.snackBar.open('Utilisateur modifié !', 'X');
      },
      error => {
        this.processValidateRunning = true;
        this.errorMessage ='Une erreur est survenue dans la modification !';
        this.snackBar.open('Utilisateur non modifié !', 'X');
      }
    );
  }

  private getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.processLoadRunning = true;
    this.usersService.getUser(id).subscribe(
      user => {
        this.user = user;
        this.copyUserToFormControl();
        this.processLoadRunning = false;
      },
      erroor => {
        this.processLoadRunning = false;
        this.errorMessage='L\'utilisatuer n\'existe pas !';
        this.snackBar.open('Utilisateur non trouvé !', 'X');
      }
    );
  }

}

