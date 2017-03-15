import { SerieService } from '../services/serie.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';



@Injectable()
export class SerieRouteActivator implements CanActivate {

    constructor(private serieService: SerieService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {
        const serieExist = !!this.serieService.getSerie(route.params['serieTitle'])

        if(!serieExist){
            this.router.navigate(['/404']);            
        }
        return serieExist;
    }
}