import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LdapManagementRoutingModule } from './ldap-management-routing.module';
import { LdapListComponent } from '../ldap-list/ldap-list.component';
import { LdapAddComponent } from '../ldap-add/ldap-add.component';
import { LdapEditComponent } from '../ldap-edit/ldap-edit.component';
import { AlertComponent } from '../share/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../appmaterial.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LdapListComponent,
    LdapAddComponent,
    LdapEditComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementRoutingModule,
    HttpClientModule,
 /*    HttpClientInMemoryWebApiModule.forRoot(InMemoryUsersService, {
      dataEncapsulation: false,
    }), */
  ],
})
export class LdapManagementModule {}
