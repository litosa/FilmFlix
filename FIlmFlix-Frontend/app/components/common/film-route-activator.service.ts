import { FilmService } from '../services/film.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';



@Injectable()
export class FilmRouteActivator implements CanActivate {

    constructor(private filmService: FilmService, private router:Router) { }

    canActivate(route:ActivatedRouteSnapshot) {
        const filmExist = !!this.filmService.getFilm(route.params['filmTitle'])

        if(!filmExist){
            this.router.navigate(['/404']);            
        }
        return filmExist;
    }
}