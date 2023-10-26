import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService,
  ) { }

  user!: User
  // Flag is logged
  auth = false;
  temp: any;
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth = true;
      this.temp = this.authService.decode(this.authService.getToken())
      this.user = {
        id: this.temp["id"],
        name: this.temp["name"],
        admin: this.temp["admin"],
        psw: '',
        email: '',
      }
    }
  }

  // Logout aka clear token
  public logout(): void {
    this.authService.logout();
    window.location.reload();
  }

}
