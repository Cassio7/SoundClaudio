import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  isAuthenticated(): boolean {
    const token = this.getToken();
    const secretKey = environment.TOKEN_KEY;
    return token ? true : false;
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
  
}
