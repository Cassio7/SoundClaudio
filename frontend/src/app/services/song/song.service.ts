import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class SongService {

  // get the url of the backend
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getinfo(id: number) {
    return this.httpClient.post(this.url + "/music/song/"+ id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    })
  }
}
