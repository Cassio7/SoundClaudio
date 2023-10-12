import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // inizialize userServ for api
  constructor(private userServices: UserService,
  ) { }

  // var for all the input from the form, 
  // FormGroup Tracks the value and validity state 
  loginForm!: FormGroup;
  // function called after the creation of the project
  ngOnInit(): void {
    //initialize with a function
    this.loginForm = this.createFormGroup();
  }
  
  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,20}$/)])
    })
  }
  //login function, starts when press button
  login(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.userServices.login(this.loginForm.value).subscribe((response: any) => {
        // set token on the localStorage on Application side
        localStorage.setItem("token",response)
        console.log(localStorage["token"])
      }, (error) => {
        console.log(error.error.message)
      })
    }
    else
      console.log("not working")
  }
}
