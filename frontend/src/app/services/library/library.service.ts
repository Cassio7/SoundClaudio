import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  // get the url of the backend
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getlikes(id: number) {
    const requestBody = {
      id: id // Replace with your desired ID value
    };
    return this.httpClient.post(this.url + "/library/getlikes",requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

}
