import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

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
    if (token)
      return true;
    else
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

  errors(error: any): void {
    // Handle error token expired
    if (error.status === 403) {
      // Add logout
      this.router.navigate(['error/403']);
    }
    if (error.status === 404)
      // Handle the specific error with status code 404
      this.router.navigate(['error/404']);
    if (error.status === 400)
      // Handle the specific error with status code 400
      this.router.navigate(['error/400']);
    if (error.status === 402)
      // Handle the specific error with status code 402
      this.router.navigate(['error/402']);
  }
}
