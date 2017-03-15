import { FilmService } from '../services/film.service';
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
    <router-outlet></router-outlet>
  `,
    styles: []
})
export class FilmsComponent implements OnInit {

    constructor(private filmsService: FilmService) { }

    ngOnInit() {
    }

}
