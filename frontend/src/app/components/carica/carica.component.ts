import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-carica',
  templateUrl: './carica.component.html',
  styleUrls: ['./carica.component.css']
})
export class CaricaComponent implements OnInit {

  dataForm!: FormGroup;
  file: any;
  temp: any;
  user!: User
  constructor(private userServ: UserService,
    private authService: AuthService
  ) { }


  // function called after the creation of the project
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.temp = this.authService.decode(this.authService.getToken())
      this.user = {
        id: this.temp["id"],
        name: this.temp["name"],
        admin: this.temp["admin"],
        psw: '',
        email: '',
      }
    }
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
  // Send to service title and file mp3
  send(): void {
    this.userServ.upload(this.dataForm.value.title,this.user.id,this.file).subscribe({
      next: (response) => {
        let mes: any = response
        alert(mes.message)
      }
    })
  }
}
