import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  //var for all the input from the form, 
  //FormGroup Tracks the value and validity state 
  signupForm!: FormGroup;

  //function called after the creation of the project
  ngOnInit(): void {
    //initialize with a function
    this.signupForm = this.createFormGroup();
  }
  //return a FormGruop object, inside we have all the inputs, with a validation
  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    })
  }
  //signup function, starts when press button
  signup(): void {
    if (this.signupForm.valid)
      console.log(this.signupForm.value);
    else {
      if (!this.signupForm.controls["name"].valid)
        console.log(1)
      if (!this.signupForm.controls["email"].valid)
        console.log(2)
      if (!this.signupForm.controls["password"].valid)
        console.log(3)
    }
  }

}
