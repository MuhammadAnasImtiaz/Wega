import { IFeature } from './../Model/feature';
import { IMake } from './../Model/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VechileService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/';


  getMake(){
    return this.http.get<IMake[]>(this.baseUrl + 'makes/makes');
  }
  
  getFeature(){
    return this.http.get<IFeature[]>(this.baseUrl + 'makes/features');
  }


}
