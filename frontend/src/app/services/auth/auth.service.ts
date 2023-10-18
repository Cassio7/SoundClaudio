import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  // Return true if there is a token, else false
  isAuthenticated(): boolean {
    const token = this.getToken();
    if(token){
      console.log(this.decode(token))
      return true;
    }
    return false;
  }

  private clearToken() {
    localStorage.removeItem('token');
  }

  login(token: string) {
    this.setToken(token);
  }
  
  logout() {
    this.clearToken();
  }
  
  // Decode the token to get the informations
  decode(token: string): object{
    return jwt_decode(token);
  }
}
