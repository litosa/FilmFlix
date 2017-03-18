import { Serie } from '../models/serie';
import { Film } from '../models/film';
import { SerieService } from '../services/serie.service';
import { FilmService } from '../services/film.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'homepage',
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Latest Films</h3>
        </div>
        <div class="panel-body">
            <div class="row">
            <div *ngFor="let film of films;let i = index" class="col-md-2">
                <div *ngIf="i < 6">
                <img *ngIf="film.imageUrl" 
                        class="thumbnail" 
                        src="{{film.imageUrl}}">
                <p><a class="btn btn-primary" routerLink="/films/{{film.filmTitle}}">View Details</a></p>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Latest Series</h3>
        </div>
        <div class="panel-body">
            <div class="row">
            <div *ngFor="let serie of series;let i = index" class="col-md-2">
                <div *ngIf="i < 6">
                <img *ngIf="serie.imageUrl" 
                        class="thumbnail" 
                        src="{{serie.imageUrl}}">
                <p><a class="btn btn-primary" routerLink="/series/{{serie.serieTitle}}">View Details</a></p>
                </div>
            </div>
            </div>
        </div>
    </div> 
    `,
    styles: [`
        img { width: 100% }
        .btn-primary { background-color: purple }
    `]
})
export class HomepageComponent implements OnInit {

    films: Film[] = [];
    series: Serie[] = [];

    constructor(private filmService: FilmService,
        private serieService: SerieService) { }

    ngOnInit() {
        this.films = this.filmService.films;
        this.series = this.serieService.series;

    }

}