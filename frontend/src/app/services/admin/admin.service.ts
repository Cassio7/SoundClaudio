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

  getall() {
    return this.httpClient.get(this.url + "/admin/getall", {
      headers: new HttpHeaders().set("Authorization", "Bearer "+this.authServ.getToken())
    })
  }
}
