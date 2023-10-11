import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(data: any) {
    return this.httpClient.post(this.url + "/users/signup", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
  login(data: any) {
    return this.httpClient.post(this.url + "/users/login", data, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
