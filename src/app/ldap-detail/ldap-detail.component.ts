
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserLdap } from '../model/user-ldap';
import { UsersService } from '../service/users.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';


export abstract class LdapDetailComponent {
  user : UserLdap; 
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;

  confirmValidParentMatcher = new ConfirmValidParentMatcher()
  errorMessage = "";
  userForm = this.fb.group({
    id: '',
    nomComplet: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group(
      { password: [''], confirmPassword: [''] },
      { validators: passwordValidator }
    ),
    email: { value: '', disabled: true },
  });




  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : '(vide si inchangé)');
  }

 
  protected onInit(): void {
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  isFormValid(): boolean {
    return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');

  }

  abstract validateForm(): void;

  onSubmitForm() {
    this.validateForm();
  }




  public updateUsername() {
    this.userForm.get('nomComplet').setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }

  updateMail(): void {
      this.userForm.get('email').setValue(this.formGetValue('nom').toLowerCase() + '@domain.com');
  }


  protected copyUserToFormControl(): void {
    this.userForm.get('nomComplet').setValue(this.user.nomComplet);
    this.userForm.get('nom').setValue(this.getNomFromUser());
    this.userForm.get('prenom').setValue(this.getPrenomFromUser());
    this.userForm.get('email').setValue(this.user.email);
  }

  private getNomFromUser() {
    var prenomETnom = this.user.nomComplet.split('.');
    return prenomETnom[0];
  }

  private getPrenomFromUser() {
    
    var prenomETnom = this.user.nomComplet.split('.');
    return prenomETnom[1];
  }

  protected getUserFormControl(): UserLdap {
    return {
      id: 2,
      nomComplet: (this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase(),
      email: this.userForm.get('email').value,
      active: true,
      password: this.userForm.get('passwordGroup.password').value,
      role: 'ROLE_USER',
    };
  }

  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }


}
