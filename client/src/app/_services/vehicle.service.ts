import { SaveVehicle } from './../Model/vehicle';

import { IFeature } from '../Model/feature';
import { IMake } from '../Model/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Vehicle } from '../Model/vehicle';

@Injectable({
  providedIn: 'root'
})



@Injectable()
export class VechileService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get(this.baseUrl + 'makes/features')
  }

  getMakes() {
    return this.http.get<any>(this.baseUrl + 'makes/makes')
  }

  create(vehicle:SaveVehicle) {
    return this.http.post(this.baseUrl + 'vehicle/add-vehicle',vehicle)
  }

  getVehicle(id:number) {
    return this.http.get(this.baseUrl + 'vehicle/'+ id)
  }

  getVehicles(){
    return this.http.get<Vehicle[]>(this.baseUrl+ 'vehicle/get-vehicles');
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.baseUrl + 'vehicle/' + vehicle.id, vehicle)
  }

  delete(id:number) {
    return this.http.delete(this.baseUrl + 'vehicle/' + id)
  }
}
