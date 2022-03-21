import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';
import { ERole } from '../model/user-ldap';


interface AuthenticationResponse {
  status: boolean,
  token: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  redirectUrl = '/';
  authenticationUrl = "http://localhost:4200"

  constructor(private httpClient: HttpClient) { 

  }

  static isLoggedIn(){
    const token =  AuthenticationService.getToken();
    console.log('token='+ token);
    return !!token && !AuthenticationService.isTokenExpied(token);
  }

  static isTokenExpied(token: string){ 
    try {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return expiry < Date.now()/ 1000;
    } catch (err){
      return false;
    }
  }

  static setToken(idToken: string){
    sessionStorage.setItem('id_token', idToken);
  }
  static getToken(){
    return sessionStorage.getItem('id_token');
  }
  static logout(){
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(nomComplet, password, role): Observable<AuthenticationResponse> {
         const response: AuthenticationResponse
          = { status: true, message: 'HTTP 200', token: 'atoken' };
        AuthenticationService.setToken('token');
        return of(response); 
      }
    }