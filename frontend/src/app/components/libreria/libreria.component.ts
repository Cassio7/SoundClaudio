import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library/library.service';
import { AuthService } from 'src/app/services/auth/auth.service';

// User interface
interface User {
  id: number;
  name: string;
  admin: any;
}

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})

export class LibreriaComponent implements OnInit{
  
  likes: any;
  user!: User

  temp: any;

  constructor(private libraryServ: LibraryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.temp = this.authService.decode(this.authService.getToken())
      this.user = {
        id: this.temp["id"],
        name: this.temp["name"],
        admin: this.temp["admin"],
      }
      this.getlikes();
      console.log(this.user.id)
    }
    
  }

  //Get all the album from the backend
  getlikes(): void {
    this.libraryServ.getlikes(this.user.id).subscribe({
      next: (response) => {
        this.likes = response;
      }
    })
  }
}
