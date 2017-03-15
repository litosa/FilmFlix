// import { Injectable } from '@angular/core';

// //Tells compiler that toastr is an object we know about,
// //In this case something on the global scope
// //But now object is limited to this component and not all over the project
// declare let toastr:any;

// @Injectable()
// export class ToastrService{
//     success(message:string, title?:string){
//         toastr.success(message,title)
//     }
//     info(message:string, title?:string){
//         toastr.info(message,title)
//     }
//     warning(message:string, title?:string){
//         toastr.warning(message,title)
//     }
//     error(message:string, title?:string){
//         toastr.error(message,title)
//     }
// }

import { OpaqueToken } from '@angular/core';

//Create an instance of toastr collected from the global 
//node module toastr defined in index.html
export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface Toastr {
    success(message: string, title?: string): void;
    info(message: string, title?: string): void;
    warning(message: string, title?: string): void;
    error(message: string, title?: string): void;
}

