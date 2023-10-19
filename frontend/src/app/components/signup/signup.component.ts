import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  //var for all the input from the form, 
  //FormGroup Tracks the value and validity state 
  signupForm!: FormGroup;
  flag = 0

  // inizialize userServ for api
  constructor(private userServices: UserService,
    private authService: AuthService,
    private router: Router
    ) { }

  //function called after the creation of the project
  ngOnInit(): void {
    this.checkAuthentication();
    //initialize with a function
    this.signupForm = this.createFormGroup();
  }
  
  //return a FormGruop object, inside we have all the inputs, with a validation
  createFormGroup(): FormGroup {
    return new FormGroup({
      //allow only name with no space and weird char, min 2 
      name: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(/^[^\s][a-zA-Z0-9][a-zA-Z0-9\\s+-_]*$/)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      //accept only pass with 1 upper letter, 1 number and 1 special char.. min 7 char
      password: new FormControl("", [Validators.required, Validators.minLength(7), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,20}$/)]),
      password_verify: new FormControl("", [Validators.required, Validators.minLength(7), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,20}$/)]),
    })
  }

  //signup function, starts when press button
  signup(): void {
    if (this.signupForm.valid && this.signupForm.value["password"] == this.signupForm.value["password_verify"]) {
      this.userServices.signup(this.signupForm.value).subscribe({
        next: (response: any) => {
          // Set token
          this.authService.login(response)
          window.location.reload();
        },
        error: (error) => {
          alert(error.error.message)
          window.location.reload();
        }
      })
    }
    else
      //changing when psw not matching
      this.flag = 1
  }

  // User is authenticated, navigate to the home page
  checkAuthentication() {
    if (this.authService.isAuthenticated())
      this.router.navigate(['/discovery']);
  }
}
