import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/security/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService){
  }
  
  ngOnInit(){
    
  }

  togleMenu(){
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
