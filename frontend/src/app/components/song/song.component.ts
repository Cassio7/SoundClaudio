import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song/song.service';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  mix: any;
  song:any;
  comments: any;
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

  getinfo(id:any): void{
    this.songService.getinfo(id).subscribe({
      next: (response) => {
        // Only song inside the response
        if (Object.keys(response).length < 2)
          this.song = response;
        // Song + comments
        else{
          this.mix = response;
          this.song = this.mix[0];
          console.log(this.song)
          for (const i in this.mix){
            this.comments = this.comments.concat(i)
          }
          console.log(this.comments)
        }
      }
    })
  }
}
