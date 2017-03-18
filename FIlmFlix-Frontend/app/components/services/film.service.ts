import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../enums/category';
import { Film } from '../models/film';
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


//Injectable möjliggör dependency injection
//om en service använder sig av andra services tex http
@Injectable()
export class FilmService {

    films: Film[] = [];
    filmsUrl: string = 'http://localhost:8088/api/films/';

    constructor(private http: Http) {
        this.getFilms();
    }

    getFilms() {
        this.http.get(this.filmsUrl)
            .map(response => <Film[]>response.json())
            .subscribe(
            data => this.films = data,
            error => console.error(error)
            );
    }

    getFilm(filmTitle: string) {
        return this.films.find(film => film.filmTitle.toLowerCase() == filmTitle.toLowerCase());
    }

    saveFilm(film: Film): Promise<Film> {
        //Convert Enum to number
        let category: Category = Category[film.category.toString()];
        film.category = category;

        this.films.push(film);

        const body = JSON.stringify(film);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .post(this.filmsUrl, body, { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }


    updateFilm(filmTitle: string, film: Film): Promise<Film> {


        let category: Category = Category[film.category.toString()];
        film.category = category;

        let index = this.films.findIndex(x => x.filmTitle == filmTitle);
        this.films[index] = film;

        const body = JSON.stringify(film);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .put(this.filmsUrl + filmTitle, body, { headers: headers })
            .toPromise()
            .then(() => film)
            .catch(this.handleError);
    }

    deleteFilm(film: Film): Promise<void> {

        let index = this.films.findIndex(x => x.filmTitle == film.filmTitle);
        this.films.splice(index, 1);

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.filmsUrl + film.filmTitle, { headers: headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}