import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user!: User
  temp: any;
  constructor(private authService: AuthService,
    ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.temp = this.authService.decode(this.authService.getToken())
      this.user = {
        id: this.temp["id"],
        name: this.temp["name"],
        admin: this.temp["admin"],
        psw: '',
        email: this.temp["email"],
      }
    }
  }

}
