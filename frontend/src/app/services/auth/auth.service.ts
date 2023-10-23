import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Set the token, called by login
  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get the token from localStorage
  getToken(): any {
    return localStorage.getItem('token');
  }

  // Return true if there is a token, else false
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      const decode: any = jwt_decode(token);
      if (decode["exp"] > 0)
        return true;
      else{
        this.logout();
        return false;
      }
    }
    return false;
  }

  // Delete the token, callled by logout
  private clearToken() {
    localStorage.removeItem('token');
  }

  // Called to set the token
  login(token: string) {
    this.setToken(token);
  }

  // Called to clear the token
  logout() {
    this.clearToken();
  }

  // Decode the token to get the informations
  decode(token: string): object {
    return jwt_decode(token);
  }
}
