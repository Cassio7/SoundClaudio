import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song/song.service';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song:any;
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
        this.song = response;
      }
    })
  }
}
