import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library/library.service';

@Component({
  selector: 'app-libreria',
  templateUrl: './libreria.component.html',
  styleUrls: ['./libreria.component.css']
})

export class LibreriaComponent implements OnInit{
  
  likes: any;
  constructor(private libraryServ: LibraryService,
  ) { }

  ngOnInit(): void {
    //this.getlikes();
  }

  // Get all the album from the backend
  // getlikes(): void {
  //   this.libraryServ.getlikes(id).subscribe({
  //     next: (response) => {
  //       this.likes = response;
  //     }
  //   })
  // }

}
