import { AuthService } from '../../services/auth.service';
import { Category } from '../../enums/category';
import { Film } from '../../models/film';
import { Subscription } from 'rxjs/Rx';
import { FilmService } from '../../services/film.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: 'app/components/films/film-details/film-details.component.html',
    styles: [`
        .container: { padding-left:20px; padding-right:20px;}
    `]
})

export class FilmDetailsComponent implements OnInit {

    private subscription: Subscription;
    filmTitle: string;
    film: Film;
    films: Film[];
    categories = Category;
    filmCategory: string;
    editMode: boolean = false;
    filteredFilm: Film;
    filteredEditFilm: Film;

    constructor(private filmService: FilmService,
        private route: ActivatedRoute, private auth: AuthService) { }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.filmTitle = params['filmTitle'];
                this.filteredFilm = this.filmService.getFilm(this.filmTitle);
                var categoryByName = this.keys();

                for (var i = 0; i < categoryByName.length; i++) {
                    if (i === this.filteredFilm.category) {

                        this.filmCategory = categoryByName[i];

                    }
                }
            }
        );
    }

    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    editFilm() {
        this.editMode = true;
    }


    editCurrentFilm(film: Film) {
        
        this.filteredFilm = film;

        var categoryByName = this.keys();

        for (var i = 0; i < categoryByName.length; i++) {
            if (categoryByName[i] === this.filteredFilm.category.toString()) {

                this.filmCategory = categoryByName[i];

            }
        }

        this.filmService.updateFilm(this.filteredFilm);
        this.editMode = false;
    }

    cancelEditFilm() {
        this.editMode = false;
    }

}