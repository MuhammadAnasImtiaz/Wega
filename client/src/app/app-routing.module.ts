import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {path:'vehicles/new' , component: VehicleFormComponent},
  {path:'vehicles/:id' , component: VehicleFormComponent},
  { path: 'vehicles', component: VehicleListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
