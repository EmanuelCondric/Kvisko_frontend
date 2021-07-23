import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/user';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user = new User();
  
  constructor(private service: RegistrationService, private dialogRef: MatDialogRef<RegisterUserComponent>) { }

  ngOnInit(): void {
  }

  saveUser(){
    if(this.checkInput()>0){
      this.service.registerUserFromRemote(this.user).subscribe(
        data => console.log('Response received.'),
        error => console.log("Exception occured.")
      );;
    }
  }

  checkInput(){
    let lsMsg: String = '';
    let input_error: Boolean = false;

    if(!this.user.firstName){
      lsMsg += 'Niste unijeli ime.\n';
      input_error = true;
    }
    if(!this.user.lastName){
      lsMsg += 'Niste unijeli prezime.\n';
      input_error = true;
    }
    if(!this.user.email){
      lsMsg += 'Niste unijeli email.\n';
      input_error = true;
    }
    if(!this.user.username){
      lsMsg += 'Niste unijeli korisničko ime.\n';
      input_error = true;
    }
    if(!this.user.password){
      lsMsg += 'Niste unijeli zaporku.\n';
      input_error = true;
    }

    var password_again = (<HTMLInputElement>document.getElementById("password-again")).value;

    if(password_again != this.user.password){
      lsMsg += 'Ponovno unesena zaporka nije jednaka prvotnoj.'
      input_error = true;
    }

    if(input_error){
      window.alert(lsMsg);
      return -1;
    }
    return 1
  }

  cancel(){
    this.dialogRef.close();
  }

}
