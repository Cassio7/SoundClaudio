import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';
import { ActivatedRoute, Params } from "@angular/router";

// For single info inside the query
interface Album{
  numsong: number;
  name: string;
  art: string;
  img: string;
}

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit{
  album : Album = {numsong : 0, name : "", art : "",img : "" }
  songs: any;
  id: any;
  // inizialize albumServ for api
  constructor(private route: ActivatedRoute,
    private albumService: AlbumService,
  ) { }

  // Start the function with the component
  ngOnInit(): void {
    // Get the right id from URL
    this.route.params.subscribe( 
    (params: Params)=>{
      this.id = +params['id'];
    }
  )
    this.getalbum(this.id);
  }

  // Get all the album from the backend
  getalbum(id: any): void {
    this.albumService.getalbum(id).subscribe({
      next: (response) => {
        this.songs = response
        this.album = {
          numsong : this.songs.length,
          name : this.songs[1].name,
          art : this.songs[1].nameart,
          img : this.songs[1].img,
        }
      }
    })
  }
}
