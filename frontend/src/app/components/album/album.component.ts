import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { LibraryService } from 'src/app/services/library/library.service';
import { Album } from 'src/app/models/album';
import { SongService } from 'src/app/services/song/song.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  //Avoid errors console log
  album: Album = { numsong: 0, name: "", art: "", img: "" }
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
    private libraryServ: LibraryService,
    private songServ: SongService
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
        psw: '',
        email: '',
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
          name: this.songs[0].name,
          art: this.songs[0].nameart,
          img: this.songs[0].img,
        }
      },
      error: (error) => {
        // Errors handler
        this.authService.errors(error);
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
      }
    })
  }

  // Add song to lib
  likesong(event: Event, idsong: number): void {
    // Stop the a to go to the linked song
    event.stopPropagation();
    this.libraryServ.likesong(idsong, this.user.id).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        this.authService.errors(error);
      }
    })
  }
  // Delete song from lib
  deletesong(event: Event, idsong: number): void {
    // Stop the a to go to the linked song
    event.stopPropagation();
    this.libraryServ.deletesong(idsong, this.user.id).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        this.authService.errors(error);
      }
    })
  }

  // Send data for player
  player(event: Event,id:number): void {
    event.stopPropagation();
    this.songServ.setMp3Info(id, this.songs)
  }
}
