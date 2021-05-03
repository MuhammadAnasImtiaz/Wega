import { Vehicle } from './../Model/vehicle';
import { VechileService } from './../_services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];

  constructor(private vehicleService: VechileService) {}

  ngOnInit() {
    this.vehicleService.getVehicles().subscribe(vehicles=> this.vehicles = vehicles);
  }

}
