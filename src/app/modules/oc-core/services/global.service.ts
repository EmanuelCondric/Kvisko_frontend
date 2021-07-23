import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AppWrapper } from "../api-models/app-wrapper.model";
import { appLocationEndpointMap } from "../app-defs/app-location-endpoint-map";
import { CrudGenericService } from "./crud-generic.service";

@Injectable({
    providedIn: 'root'
})

export class GlobalService {
    appParams!: AppWrapper;
    anyAuthPageUrlCurrentOpen!: boolean;
    userLogged!: boolean;

    constructor(private httpClient: HttpClient, private crudService: CrudGenericService){}

    fetchAppParams(){
        let url = environment.apiUrl + '/' + appLocationEndpointMap.get('app-params');

        (this.httpClient.get(url) as Observable<AppWrapper>).subscribe(data => {
            this.appParams = data;
        });
    }
}