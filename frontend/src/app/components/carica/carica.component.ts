import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-carica',
  templateUrl: './carica.component.html',
  styleUrls: ['./carica.component.css']
})
export class CaricaComponent implements OnInit {

  dataForm!: FormGroup;
  file: any;

  constructor(private userServ: UserService
  ) { }


  // function called after the creation of the project
  ngOnInit(): void {
    //initialize with a function
    this.dataForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(4)]),
      mp3: new FormControl("", [Validators.required])
    })
  }
  // On file Select 
  onChange(event:any) {
    this.file = event.target.files[0];
    if(this.file.type != 'audio/mpeg'){
      alert('Plese put a mp3 audio!');
      window.location.reload();
    }
  }
  send(): void {
    this.userServ.upload(this.dataForm.value.mp3,this.file).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }
}
