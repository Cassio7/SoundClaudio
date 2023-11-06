import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  flagtitle: number = -1;
  newname:string = '';

  constructor(private adminServ: AdminService,
    private router: Router,
    private authServ: AuthService) {

  }

  //Get all likes from db, favorite icon change color is match id
  getall(): void {
    this.adminServ.getall().subscribe({
      next: (response) => {
        this.users = response;
        this.flaguser = !this.flaguser ? true : false;
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
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
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
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
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
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
        this.authServ.errors(error);
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
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
      }
    })
  }

  modsong(id: number): void {
    this.flagtitle = id;
    this.newname = '';
  }

  //Get all sogns 
  getallsongs(): void {
    this.adminServ.getallsongs().subscribe({
      next: (response) => {
        this.songs = response;
        this.flagsong = !this.flagsong ? true : false;
      },
      error: (error) => {
        this.authServ.errors(error);
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
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
      }
    })
  }

  // Update song title by id
  updatetitle(id: number, newtitle: string): void {
    console.log(newtitle)
    this.adminServ.updatesong(id,newtitle).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message + ' song id: ' + id)
        window.location.reload();
      },
      error: (error) => {
        // Errors handler
        this.authServ.errors(error);
      }
    })
  }
}
