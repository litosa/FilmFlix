import { FilmService } from '../services/film.service';
import { AuthService } from '../services/auth.service';
import { Film } from '../models/film';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
    selector: 'film-thumbnail',
    template: `        
        <div [routerLink]="['/films', film.filmTitle]" *ngIf="film"
                                                        class="clearfix well hoverwell thumbnail">
            <h5 class="text-center">{{film.filmTitle}}
                <i *ngIf="film.voters > 4"
                    class="glyphicon glyphicon-fire"
                    style="color:red">
                </i>
            </h5>
            <img class="img-responsive" style="margin-bottom:15px;" src="{{film.imageUrl}}">
            <a *ngIf="auth.isAuthenticated()" class="btn btn-danger" id="deleteFilm" (click)="deleteFilm($event)">Delete Film</a>                    
            
        </div>
        <div *ngIf="!film"><p>Film Is Not Available</p></div>    
    `,
    styles: [`
        .thumbnail {max-height:300px;}
        img {max-height:100px;}
        h2 {color:#bbb;}
        a {text-align: center; display:block;}
    `]
})

export class FilmThumbnailComponent {

    @Input() film: Film;
    films: Film[];

    constructor(private filmService: FilmService, private auth: AuthService) { }

    deleteFilm(event) {
        
        event.stopPropagation();

        if (event.target.id == 'deleteFilm') {

            this.films = this.filmService.films;
            let index = this.films.indexOf(this.film);
            this.filmService.deleteFilm(index);
        }
    }

}
