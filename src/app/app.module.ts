import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppMaterialModule } from './appmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LdapManagementModule } from './ldap-management/ldap-management.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule, 
    HttpClientModule,
 /*    HttpClientInMemoryWebApiModule.forRoot(InMemoryUsersService, {
      dataEncapsulation: false,
    }), */
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
