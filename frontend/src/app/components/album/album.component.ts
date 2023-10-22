import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { LibraryService } from 'src/app/services/library/library.service';
import { Album } from 'src/app/models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  album!: Album;
  songs: any;
  id: any;

  likes: any;
  user!: User
  temp: any;
  arrayid: number[] = [];

  // inizialize albumServ for api
  constructor(private route: ActivatedRoute,
    private albumService: AlbumService,
    private router: Router,
    private authService: AuthService,
    private libraryServ: LibraryService
  ) { }

  // Start the function with the component
  ngOnInit(): void {
    // Get the right id from URL
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    )
    this.getalbum(this.id);
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

  // Get all the album from the backend
  getalbum(id: any): void {
    this.albumService.getalbum(id).subscribe({
      next: (response) => {
        this.songs = response
        this.album = {
          numsong: this.songs.length,
          name: this.songs[1].name,
          art: this.songs[1].nameart,
          img: this.songs[1].img,
        }
      },
      error: (error) => {
        // Handle the error response
        if (error.status === 404)
          // Handle the specific error with status code 404
          this.router.navigate(['error/404']);
        if (error.status === 400)
          // Handle the specific error with status code 400
          this.router.navigate(['error/400']);
      }
    })
  }
    //Get all likes from db, favorite icon change color is match id
    getlikes(): void {
      this.libraryServ.getlikes(this.user.id).subscribe({
        next: (response) => {
          this.likes = response;
          for (let index = 0; index < this.likes.length; index++) {
             this.arrayid.push(this.likes[index].id); 
          }
        },
        error: (error) => {
          if (error.status === 404){
            alert("Your Library is empty, put some likes!")
          }
        }
      })
    }
}
