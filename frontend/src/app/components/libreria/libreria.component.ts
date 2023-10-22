import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library/library.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})

export class LibreriaComponent implements OnInit {

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
    }
  }

  //Get likes from db
  getlikes(): void {
    this.libraryServ.getlikes(this.user.id).subscribe({
      next: (response) => {
        this.likes = response;
      },
      error: (error) => {
        if (error.status === 404) {
          alert("Your Library is empty, put some likes!")
        }
      }
    })
  }

  // Add song to lib
  deletesong(event: Event,idsong: number): void {
    // Stop the a to go to the linked song
    event.stopPropagation();
    this.libraryServ.deletesong(idsong, this.user.id).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
}
