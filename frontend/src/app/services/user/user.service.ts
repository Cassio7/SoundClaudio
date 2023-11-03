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
  // Need a FormData to send the file
  upload(title: string, id: any, mp3: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('id', id);
    formData.append('mp3', mp3);
    // No header because browser to defaul this 'Content-Type': 'multipart/form-data'
    return this.httpClient.post(this.url + "/users/upload", formData)
  }
  
  myupload(id:any){
    const requestBody = {
      id: id, // Replace with your desired ID value
    };
    return this.httpClient.post(this.url + "/users/myupload", requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
