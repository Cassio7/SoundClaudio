import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user!: User
  temp: any;
  uploads: any = false;
  constructor(private authService: AuthService,
    private UserServ: UserService
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
      this.UserServ.myupload(this.user.id).subscribe({
        next: (response) => {
          this.uploads = response;
          // If the user didnt upload nothing
          if(this.uploads.length == 0)
            this.uploads = false
        }
      })
    }
  }

}
