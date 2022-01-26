import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'user/add', component: LdapAddComponent },
  { path: 'user/:id', component: LdapEditComponent },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
