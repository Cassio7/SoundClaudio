import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
  selector: 'app-discrover',
  templateUrl: './discrover.component.html',
  styleUrls: ['./discrover.component.css']
})
export class DiscroverComponent implements OnInit {

  albums: any;
  // inizialize albumServ for api
  constructor(private albumService: AlbumService,
  ) { }

  // Start the function with the component
  ngOnInit(): void {
    this.getallalbums();
  }

  // Get all the album from the backend
  getallalbums(): void {
    this.albumService.getallalbums().subscribe({
      next: (response) => {
        console.log(response)
        this.albums = response
      }
    })
  }
}
