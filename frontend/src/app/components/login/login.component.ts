import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // inizialize userServ for api
  constructor(private userServices: UserService,
    private authService: AuthService,
    private router: Router,
  ) { }

  // var for all the input from the form, 
  // FormGroup Tracks the value and validity state 
  loginForm!: FormGroup;
  // function called after the creation of the project
  ngOnInit(): void {
    this.checkAuthentication();
    //initialize with a function
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,20}$/)])
    })
  }
  // login function, starts when press button
  login(): void {
    if (this.loginForm.valid) {
      this.userServices.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          // Set the token
          this.authService.login(response)
          window.location.reload();
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
    else
      console.log("not working")
  }

// User is authenticated, navigate to the home page
  checkAuthentication() {
    if (this.authService.isAuthenticated())
      this.router.navigate(['/discovery']);
  }
}
