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
    return this.httpClient.post(this.url + "/library/getlikes",id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

}
