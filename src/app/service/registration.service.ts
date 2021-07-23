import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { CrudGenericService } from '../modules/oc-core/services/crud-generic.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private crudService: CrudGenericService) {
  }

  public loginUserFromRemote(credentials: { username: any; password: any; }): Observable<any> {
    return this.crudService.doActionOfPostType(null, 'app-auth', 'signin', {
      username: credentials.username,
      password: credentials.password
    });
  }

  public registerUserFromRemote(user: User): Observable<any>{
    return this.crudService.doActionOfPostType(null, 'registration', 'user-registration', user);
  }
}
