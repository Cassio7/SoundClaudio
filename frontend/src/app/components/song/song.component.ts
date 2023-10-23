import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/song/song.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { Song } from 'src/app/models/song';


@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  
  user!: User
  data:any;
  // Avoid errors console log
  song: Song= {id: 0,       
    namesong: '',
    img: '',
    name: '',
    nameart: '',
    mp3: ''
  }
  id: any;
  temp: any

  // var for all the input from the form, 
  // FormGroup Tracks the value and validity state 
  commentForm!: FormGroup;

  // inizialize imports
  constructor(private route: ActivatedRoute,
    private songService: SongService,
    private router: Router,
    private authService: AuthService,
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
    this.temp = this.authService.decode(this.authService.getToken())
    this.user = {
      id: this.temp["id"],
      name: this.temp["name"],
      admin: this.temp["admin"],
    }
    this.commentForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      comment: new FormControl("", [Validators.required])
    })
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

  comment(idsong:number,id:number): void{
    if(this.commentForm.valid){
      this.songService.comment(this.user.id,this.id,this.commentForm.value.comment).subscribe({
        next: (response) => {
          alert("Song commented");
          window.location.reload();
        },
        error: (error) =>{
          if (error.status === 400)
           alert(error.error.message)
        }
      })
    }
  }
}
