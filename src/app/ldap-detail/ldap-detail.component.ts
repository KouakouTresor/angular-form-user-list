
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserLdap } from '../model/user-ldap';
import { UsersService } from '../service/users.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';

/*  @Component({
   selector: 'app-ldap-detail',
  templateUrl: './ldap-detail.component.html',
  styleUrls: ['./ldap-detail.component.scss'], 
})  */

export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string; 

  confirmValidParentMatcher = new ConfirmValidParentMatcher()
  errorMessage = ''
  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group(
      { password: [''], confirmPassword: [''] },
      { validators: passwordValidator }
    ),
    mail: { value: '', disabled: true },
  });




  protected constructor(
    public addForm: boolean,
    /*  private route: ActivatedRoute, */
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(vide si inchangé)');
  }

  protected onInit(): void {
   /*  this.getUser(); */
  }

  isFormValid(): boolean {
    return (
      this.userForm.valid &&
      (!this.addForm || this.formGetValue('passwordGroup.password')! == '')
    );
  }  

  abstract validateForm(): void;

  onSubmitForm() {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm
        .get('login')
        .setValue(
          (
            this.formGetValue('prenom') +
            '.' +
            this.formGetValue('nom')
          ).toLowerCase()
        );
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm
        .get('mail')
        .setValue(this.formGetValue('login').toLowerCase() + '@domain.com');
    }
  }

  protected  copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
  } 

  protected getUserFormControl(): UserLdap {
    return {
      id: this.userForm.get('id').value,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + '' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-01-01',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'Role_USER',
    };
  } 

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }



  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  /*  abstract validateForm(): void; */


   
}
