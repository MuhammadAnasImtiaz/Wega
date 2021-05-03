import { ErrorHandler, Inject, Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn:'root'
})

export class AppErrorHandler implements ErrorHandler {
    
    constructor(private toastr: ToastrService){

    }
    
    handleError(error:any): void {
        
        console.log("An error occured");
        // this.toastr.error('Error','An unexped error occurred',{ timeOut:5000});
         
    }
}