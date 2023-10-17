import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  
  // get the url of the backend
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  
  getallalbums() {
    return this.httpClient.get(this.url + "/music/getallalbums", {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }

  getalbum(id: number) {
    return this.httpClient.post(this.url + "/music/" + id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
