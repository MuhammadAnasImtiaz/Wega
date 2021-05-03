import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NavmenuComponent,
    VehicleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      }
    )
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
