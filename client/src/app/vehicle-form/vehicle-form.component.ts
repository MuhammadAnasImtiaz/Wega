import * as _ from 'underscore';
import { Vehicle, SaveVehicle } from './../Model/vehicle';
import { IFeature } from './../Model/feature';
import { VechileService } from '../_services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { IMake } from '../Model/make';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})

// export class VehicleFormComponent implements OnInit {
//   makes: any[]; 
//   models: any[];
//   features: any;
//   vehicle: SaveVehicle = {
//     id: 0,
//     makeId: 0,
//     modelId: 0,
//     isRegistered: false,
//     features: [],
//     contact: {
//       name: '',
//       email: '',
//       phone: '',
//     }
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private vehicleService: VechileService,
//     private toastyService: ToastrService) {

//       route.params.subscribe(p => {
//         this.vehicle.id = +p['id'];
//       });
//     }

//   ngOnInit() {
    

//     forkJoin(
//       [
//       this.vehicleService.getMakes(),
//       this.vehicleService.getFeatures(),
//       this.vehicleService.getVehicle(this.vehicle.id)
//       ]
//     ).subscribe(data => {
//       this.makes = data[0];
//       console.log(this.makes)
//       this.features = data[1];
      

//       if (this.vehicle.id) {
//         this.setVehicle(data[2]);
//         this.populateModels();
//       }
//     }, err => {
//       if (err.status == 404)
//         this.router.navigate(['/home']);
//     });
//   }

//   private setVehicle(v:any) {
//     this.vehicle.id = v.id;
//     this.vehicle.makeId = v.make.id;
//     this.vehicle.modelId = v.model.id;
//     this.vehicle.isRegistered = v.isRegistered;
//     this.vehicle.contact = v.contact;
//     this.vehicle.features = _.pluck(v.features, 'id');
//   } 

//   onMakeChange() {
//     this.populateModels();

//     delete this.vehicle.modelId;
//   }

//   private populateModels() {
//     var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
//     this.models = selectedMake ? selectedMake.models : [];
//   }

//   onFeatureToggle(featureId:number, $event:any) {
//     if ($event.target.checked)
//       this.vehicle.features.push(featureId);
//     else {
//       var index = this.vehicle.features.indexOf(featureId);
//       this.vehicle.features.splice(index, 1);
//     }
//   }

//   submit() {
//     if(this.vehicle.id){
//       this.vehicleService.update(this.vehicle)
//         .subscribe(x => {
//           this.toastyService.success('Success','The vehicle was successfully completed',{ timeOut:5000});
//         })
//     }
//     else{
//       this.vehicleService.create(this.vehicle)
//          .subscribe(x => console.log(x));
//     }
//   }
    


//   delete() {
//     if (confirm("Are you sure?")) {
//       this.vehicleService.delete(this.vehicle.id)
//         .subscribe(x => {
//           this.router.navigate(['vehicles']);
//         });
//     }
//   }
// }

export class VehicleFormComponent implements OnInit {
  makes: any[]; 
  models: any[];
  features: any;
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VechileService,
    private toastyService: ToastrService) {

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'] ?? 0;
        
      });
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];
    
    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if (this.vehicle.id) {
        this.setVehicle(data[2]);
        this.populateModels();
      }
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/vehicles']);
    });
  }

  private setVehicle(v: any) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  } 

  onMakeChange() {
    this.populateModels();

    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId:number, $event:any) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success('Success','The vehicle was successfully completed',{ timeOut:5000});
        });
    }
    else {
      this.vehicle.id = 0;
      this.vehicleService.create(this.vehicle)
        .subscribe(x =>
          this.toastyService.success('Success','The new vehicle created',{ timeOut:5000})
        );

    }
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }
}

