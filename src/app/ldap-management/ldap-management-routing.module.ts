import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { LdapAddComponent } from '../ldap-add/ldap-add.component';
import { LdapEditComponent } from '../ldap-edit/ldap-edit.component';
import { LdapListComponent } from '../ldap-list/ldap-list.component';
import { LdapComponent } from '../ldap/ldap.component';
import { AuthGuard } from '../security/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'users',
    component: LdapComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: LdapListComponent },
      { path: 'add', component: LdapAddComponent},
      { path: ':id', component: LdapEditComponent},
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  },
  ];
  @NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
  })
  export class LdapManagementRoutingModule { }