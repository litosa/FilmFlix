import { FilmService } from '../services/film.service';
import { SerieService } from '../services/serie.service';
import { Serie } from '../models/serie';
import { Film } from '../models/film';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'navbar',
    templateUrl: 'app/components/navbar/navbar.component.html',
    styles: [`
        .nav.navbar-nav {font-size:15px;}
        #searchForm {margin-right:100px;}
        @media (max-width:1200px){#searchForm {display:none}}
        li > a.active {color:#F97924;}
    `]
})


export class NavbarComponent implements OnInit {

    searchTerm: string = "";

    foundfilms: Film[];
    foundseries: Serie[];

    film: Film[];
    serie: Serie[];

    constructor(private auth: AuthService,
        private serieService: SerieService,
        private filmService: FilmService) { }

    ngOnInit() {
    }


    searchVideos(searchTerm) {

        this.serie = this.serieService.series;
        this.film = this.filmService.films;

        let term = searchTerm.toLocaleLowerCase();
        this.foundfilms = [];
        this.foundseries = [];

        this.foundseries = this.serie.filter(
            (serie) => {
                return serie.serieTitle.toLowerCase().indexOf(term) !== -1;
            }
        );

        this.foundfilms = this.film.filter(
            (film) => {
                return film.filmTitle.toLowerCase().indexOf(term) !== -1;
            }
        );
    }
}