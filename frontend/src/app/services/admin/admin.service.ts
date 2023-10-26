import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // get the url of the backend
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient,
    private authServ: AuthService) { }

  // Get all users from api, for all this function set a token on header
  getall() {
    return this.httpClient.get(this.url + "/admin/getall", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Delete user from db by id
  delete(id: number) {
    const requestBody = {
      id: id
    };
    return this.httpClient.post(this.url + "/admin/delete", requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Delete user from db by id
  promote(id: number) {
    const requestBody = {
      id: id
    };
    return this.httpClient.post(this.url + "/admin/promote", requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Get all albums from api
  getallalbums() {
    return this.httpClient.get(this.url + "/admin/getallalbums", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Delete album from db by id
  deletealbums(id: number) {
    const requestBody = {
      id: id
    };
    return this.httpClient.post(this.url + "/admin/deletealbums", requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Get all songs from api
  getallsongs() {
    return this.httpClient.get(this.url + "/admin/getallsongs", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }

  // Delete song from db by id
  deletesong(id: number) {
    const requestBody = {
      id: id
    };
    return this.httpClient.post(this.url + "/admin/deletesong", requestBody, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.authServ.getToken())
    })
  }
}
