import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  users: any;
  constructor(private adminServ: AdminService,
    private router: Router){

  }

  //Get all likes from db, favorite icon change color is match id
  getall(): void {
    this.adminServ.getall().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        if (error.status === 401)
        // Handle the specific error with status code 404
        this.router.navigate(['error/401']);
      }
    })
  }
}
