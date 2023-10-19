import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService,
  ) { }
  
  // Flag is logged
  auth = false;

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth = true;
    }
  }
  public logout(): void{
    this.authService.logout();
    window.location.reload();
  }
}
