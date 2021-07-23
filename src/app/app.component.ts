import { Component } from '@angular/core';
import { CrudGenericService } from './modules/oc-core/services/crud-generic.service';
import { GlobalService } from './modules/oc-core/services/global.service';
import { TokenStorageService } from './service/security/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kvisko App';

  constructor(public globalService: GlobalService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.globalService.userLogged = true;
    }
    else {
      this.globalService.userLogged = false;
    }
  }
}

