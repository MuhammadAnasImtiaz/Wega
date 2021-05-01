import { IFeature } from './../Model/feature';
import { VechileService } from './../_services/make.service';
import { Component, OnInit } from '@angular/core';
import { IMake } from '../Model/make';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  makes:IMake[];
  models:any[];
  vehicle :any={};
  features:IFeature[];


  constructor(private vehicleService : VechileService) { }

  ngOnInit(){
    this.loadMakes();
    this.loadFeatures();
  }

  loadMakes(){
    this.vehicleService.getMake().subscribe(make => {
      this.makes = make;
    })
  }

  loadFeatures(){
    this.vehicleService.getFeature().subscribe(features => {
      this.features = features;
    })
  }

  onMakeChange(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake.models;
 }

}
