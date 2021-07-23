import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appLocationEndpointMap } from '../app-defs/app-location-endpoint-map';
import { DatatableParams } from '../view-models/datatable-params.view-model';
import { RestResponse } from '../models/rest-response.model';

@Injectable({
  providedIn: 'root'
})
export class CrudGenericService {
 
  constructor(private httpClient: HttpClient) {}

  // to do
// id number or string as id param. shouldnt be a casting problem.
// error handling
  retrieveSingleEntity<T>(returnType: T, id: any, appLocation: string, actionName?: string, requestParams?: any): Observable<T> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation) + '/' + id;
    if (actionName) {
      url += '/' + actionName;
    }
    
    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

    return this.httpClient.get(url) as Observable<T>;            
  }

  retrieveEntityList <T>(returnType: T, datatableParams: DatatableParams, searchFormParams: Object, 
    otherParams: Object, appLocation: string, requestParams?: any): Observable<T[]> {
    // to do: serialize datatableParams and searchFormParams to json and add it to get params
    let httpUrlEncodingCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation) + '?';

    var searchFormParamsText = '';
    if (searchFormParams) {
      searchFormParamsText = JSON.stringify(searchFormParams);      
      searchFormParamsText = httpUrlEncodingCodec.encodeValue(searchFormParamsText);
    }
    let otherParamsText = '';
    if (otherParams) {
      otherParamsText = JSON.stringify(otherParams);      
      otherParamsText = httpUrlEncodingCodec.encodeValue(otherParamsText);
    }
    
    if (searchFormParamsText) {
      url += 'searchFormParams=' + searchFormParamsText + '&';
    }
    if (otherParamsText) {
      url += 'otherParams=' + otherParamsText + '&';
    }
    if (requestParams) {
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }
    return this.httpClient.get(url) as Observable<T[]>;            
  }

  retrieveEntityListByPath <T>(returnType: T, searchFormParams: Object, appLocation: string, path: string[], requestParams?: any): Observable<T[]> {
    // to do: serialize datatableParams and searchFormParams to json and add it to get params
    let httpUrlEncodingCodec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);

    if (path) {
      path.forEach(element => {
        url += '/' + element;
      });
    }

    url += '?';

    var searchFormParamsText = '';
    if (searchFormParams) {
      searchFormParamsText = JSON.stringify(searchFormParams);      
      searchFormParamsText = httpUrlEncodingCodec.encodeValue(searchFormParamsText);
    }
    if (searchFormParamsText) {
      url += 'searchFormParams=' + searchFormParamsText + '&';
    }
    
    if (requestParams) {      
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

   

    return this.httpClient.get(url) as Observable<T[]>;            
  }

  retrieveEntityListByIds <T,K>(returnType: T, idList: Array<K>, appLocation: string): Observable<T[]> {
    // post zasto ???
    return this.httpClient.post(environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation), idList) as Observable<T[]>;            
  }

  createOrUpdateSingleEntity<T>(object: T, id:any, appLocation: string, requestParams?: any): Observable<RestResponse> {

    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if(id != null){
      url += '/' + id;
    }

    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }


    return this.httpClient.post(url, object) as Observable<RestResponse>;
  }

  deleteSingleEntity(id:any, appLocation: string, requestParams?: any): Observable<RestResponse> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation) + '/' + id;
    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }
    return this.httpClient.delete(url) as Observable<RestResponse>;        
  }

  deleteEntityList(id: any[], appLocation: string): Observable<RestResponse[]> {
    // to do: serialize id[] to json[] and it to url param
    return this.httpClient.delete(environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation)) as Observable<RestResponse[]>;
  }

  updateSingleEntity<T>(object: T, id:any, appLocation: string): Observable<RestResponse> {
    return this.httpClient.put(environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation) + '/' + id, object) as Observable<RestResponse>;  
  }

  uploadDocument(formData: FormData, appLocation: string): Observable<RestResponse> {
    return this.httpClient.post(environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation), formData) as Observable<RestResponse>;
  }

  getDocument(id: any, appLocation: string): Observable<Blob> {
    return this.httpClient.get(environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation) + '/' + id, { responseType: "blob" }) as Observable<Blob>;
  }
 
    
  doActionOfGetType (id: any, appLocation: string, actionName: string, requestParams: any, headerParams?: {name: string, value: string}[]): Observable<RestResponse> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if (id) {
      url += '/' + id;
    }
    if (actionName) {
      url += '/' + actionName;
    }
   
    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

    
    if (headerParams) {
      let reqHeaders = new HttpHeaders();
      headerParams.forEach(item => {
        if (item.value) {
          reqHeaders = reqHeaders.append(item.name, item.value);
        }
      });
      let options = { headers: reqHeaders};
      return this.httpClient.get(url, options) as Observable<RestResponse>;
    }
        
    return this.httpClient.get(url) as Observable<RestResponse>;
  }

  doActionOfGetTypeBlob (id: any, appLocation: string, actionName: string, requestParams: any, headerParams?: {name: string, value: string}[]): Observable<Blob> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if (id) {
      url += '/' + id;
    }
    if (actionName) {
      url += '/' + actionName;
    }
   
    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

    
    if (headerParams) {
      let reqHeaders = new HttpHeaders();
      headerParams.forEach(item => {
        if (item.value) {
          reqHeaders = reqHeaders.append(item.name, item.value);
        }
      });
      let options = { headers: reqHeaders};
      return this.httpClient.get(url, options) as Observable<Blob>;
    }
        
    return this.httpClient.get(url, { responseType: "blob" }) as Observable<Blob>;
  }

  doActionOfPostType (id: any, appLocation: string, actionName: string, requestBody: any, requestParams?: any, headerParams?: {name: string, value: string}[]): Observable<any> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if (id) {
      url += '/' + id;
    }
    if (actionName) {
      url += '/' + actionName;
    }

    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }
    
    if (headerParams) {
      let reqHeaders = new HttpHeaders();
      headerParams.forEach(item => {
        if (item.value) {
          reqHeaders = reqHeaders.append(item.name, item.value);
        }
      });
      let options = { headers: reqHeaders};
      return this.httpClient.post(url, requestBody, options) as Observable<any>;
    }
    
    return this.httpClient.post(url, requestBody) as Observable<any>;
  }

  doActionOfPutType (id: any, appLocation: string, actionName: string, requestBody: any, requestParams?: any, headerParams?: {name: string, value: string}[]): Observable<any> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if (id) {
      url += '/' + id;
    }
    if (actionName) {
      url += '/' + actionName;
    }

    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

    if (headerParams) {
      let reqHeaders = new HttpHeaders();
      headerParams.forEach(item => {
        if (item.value) {
          reqHeaders = reqHeaders.append(item.name, item.value);
        }
      });
      let options = { headers: reqHeaders};
      return this.httpClient.put(url, requestBody, options) as Observable<any>;
    }
    
    return this.httpClient.put(url, requestBody) as Observable<any>;
  }

  doActionOfDeleteType (id: any, appLocation: string, actionName: string, requestBody: any, requestParams?: any, headerParams?: {name: string, value: string}[]): Observable<any> {
    let url = environment.apiUrl + '/' + appLocationEndpointMap.get(appLocation);
    if (id) {
      url += '/' + id;
    }
    if (actionName) {
      url += '/' + actionName;
    }

    if (requestParams) {
      url += '?';
      Object.keys(requestParams).forEach(key => {
        if (requestParams[key]) {
          url += key + "=" + requestParams[key] + '&';
        }
      }); 
    }

    if (headerParams) {
      let reqHeaders = new HttpHeaders();
      headerParams.forEach(item => {
        if (item.value) {
          reqHeaders = reqHeaders.append(item.name, item.value);
        }
      });
      let options = { headers: reqHeaders};
      return this.httpClient.delete(url, options) as Observable<any>;
    }
    
    return this.httpClient.delete(url) as Observable<any>;
  }
}
