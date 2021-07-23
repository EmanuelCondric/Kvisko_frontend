import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegistrationService } from '../service/registration.service';
import { MatDialog } from '@angular/material/dialog'
import { RegisterUserComponent } from '../register-user/register-user.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../modules/oc-core/services/global.service';
import { globalParams } from '../modules/oc-core/app-defs/global-params';
import { TokenStorageService } from '../service/security/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(private service: RegistrationService, private dialog: MatDialog, private router: Router, private globalService: GlobalService, private fb: FormBuilder, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.globalService.userLogged) {
      window.location.href = globalParams.appContextPath;
    }
    else {
      this.loginFormGroup = this.fb.group({
        username: null,
        password: null
      });
    }
  }

  loginUser(){
    this.service.loginUserFromRemote({ username: this.loginFormGroup.get('username')!.value, password: this.loginFormGroup.get('password')!.value }).subscribe(response => {
      this.tokenStorageService.saveToken(response.token);
      this.tokenStorageService.saveUser(response);
      this.globalService.userLogged = true;

      window.location.href = globalParams.appContextPath;
    },
      error => {
      })  
  }

  logoutUser() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  registrationUser(){
    this.dialog.open(RegisterUserComponent);
  }

}
