import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // get the url of the backend
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  // Function calling api
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
  
  upload(title: string, mp3: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('mp3', mp3);
    const requestBody = {
      title: title, // Replace with your desired ID value
      mp3: mp3
    };
    return this.httpClient.post(this.url + "/users/upload", formData, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
