import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Print html
  users: any;
  albums: any;
  songs: any;
  // Flags for show
  flaguser: boolean = false;
  flagalbum: boolean = false;
  flagsong: boolean = false;

  constructor(private adminServ: AdminService,
    private router: Router) {

  }

  //Get all likes from db, favorite icon change color is match id
  getall(): void {
    this.adminServ.getall().subscribe({
      next: (response) => {
        this.users = response;
        this.flaguser = !this.flaguser ? true : false;
      },
      error: (error) => {
        if (error.status === 401)
          // Handle the specific error with status code 401
          this.router.navigate(['error/401']);
      }
    })
  }

  // Call api to delete user, pass id
  delete(id: number): void {
    this.adminServ.delete(id).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message + ' user id: ' + id)
        window.location.reload();
      }
    })
  }

  // Call api to delete user, pass id
  promote(id: number): void {
    this.adminServ.promote(id).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message + ' user id: ' + id)
        window.location.reload();
      }
    })
  }

  //Get all albums 
  getallalbums(): void {
    this.adminServ.getallalbums().subscribe({
      next: (response) => {
        this.albums = response;
        this.flagalbum = !this.flagalbum ? true : false;
      },
      error: (error) => {
        if (error.status === 401)
          // Handle the specific error with status code 401
          this.router.navigate(['error/401']);
      }
    })
  }

  // Call api to delete album, pass id
  deletealbums(id: number): void {
    this.adminServ.deletealbums(id).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message + ' album id: ' + id)
        window.location.reload();
      }
    })
  }

  //Get all sogns 
  getallsongs(): void {
    this.adminServ.getallsongs().subscribe({
      next: (response) => {
        this.songs = response;
        this.flagsong = !this.flagsong ? true : false;
      },
      error: (error) => {
        if (error.status === 401)
          // Handle the specific error with status code 401
          this.router.navigate(['error/401']);
      }
    })
  }

  // Call api to delete song, pass id
  deletesong(id: number): void {
    this.adminServ.deletesong(id).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message + ' song id: ' + id)
        window.location.reload();
      }
    })
  }
}
