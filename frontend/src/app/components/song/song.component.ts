import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song/song.service';
import { ActivatedRoute, Params } from "@angular/router";

// Info of the song
interface Song{
  id : number;
  namesong: string;
  img: string;
  name: string;
  nameart: string;
  mp3: string;
}

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  data:any;
  // Inizialize
  song: Song = {id: 0,       
    namesong: '',
    img: '',
    name: '',
    nameart: '',
    mp3: ''
  }
  id: any;

  // inizialize albumServ for api
  constructor(private route: ActivatedRoute,
    private songService: SongService,
  ) { }
  
  // Start the function with the component
  ngOnInit(): void {
    // Get the right id from URL
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    )
    this.getinfo(this.id);
  }

  // Main function to get all the info for the tune
  getinfo(id:any): void{
    this.songService.getinfo(id).subscribe({
      next: (response) => {
        // Check is data
        if (Object.keys(response).length > 0){
          this.data = response;
          this.song = {
            id : this.data[0].id,
            namesong : this.data[0].namesong,
            img : this.data[0].img,
            name : this.data[0].name,
            nameart : this.data[0].nameart,
            mp3 : this.data[0].mp3,
          }
          // Get only the comments for *ngFor
          this.data.shift();
        }
      }
    })
  }
}
