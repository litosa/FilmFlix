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

    constructor(private http: Http) {
        this.getFilms();
    }

    getFilms() {
        this.http.get('http://localhost:8088/api/films/')
            .map(response => <Film[]>response.json())
            .subscribe(
            data => this.films = data,
            error => console.error(error)
            );
    }

    getFilm(filmTitle: string) {
        return this.films.find(film => film.filmTitle.toLowerCase() == filmTitle.toLowerCase());
    }

    saveFilm(film: Film) {
        //Convert Enum to number
        let category: Category = Category[film.category.toString()];
        film.category = category;

        const body = JSON.stringify(film);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 

        this.http.post('http://localhost:8088/api/films/', body, { headers: headers });
    }

    // saveFilmToDb() {
    //     debugger;
    //     const body = JSON.stringify(this.films);
    //     const headers = new Headers({
    //         'Content-Type': 'application/json'
    //     });
    //     return this.http.put('http://localhost:8088/api/films/', body, { headers: headers });
    // }

    updateFilm(film: Film) {
        let index = FILMS.findIndex(x => x.filmTitle == film.filmTitle);
        FILMS[index] = film;
    }

    deleteFilm(index: number) {
        this.films.splice(index, 1);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}


const FILMS = [
    {
        "filmTitle": "Batman v Superman: Dawn of Justice",
        "description": "interna konflikten mellan två av jordens största superhjältar trappas upp.",
        "imageUrl": "http://dreamvtt.com/imagehost/data/uploads/users/d9df2267-60c6-43fe-91f3-1d8f1b7ef601/1180512488.jpg",
        "category": 3,
        "voters": 5,
        "resourceUrl": "http://185.152.65.162/2gru3atm7bntzhru5337dzrcplk5kysy5hyccdcy3mzi6dyhjbxdqozoudxa/v.mp4",
        "published": "2017-02-10T00:52:26.108081",
        "length": 151
    },
    {
        "filmTitle": "Moana",
        "description": "I det forntida Oceanien i Söderhavet ger sig den skickliga seglaren Vaiana ut för att leta efter en sägenomspunnen ö",
        "imageUrl": "http://dreamfilmhd.sh/images/imdb/tt3521164.jpg",
        "category": 2,
        "voters": 2,
        "resourceUrl": "http://185.142.238.176/2gruwdgx7fntzhru53y7d3rcfqnd6d2xdtn2lnyclbb6272ixwggmfgmzpaq/v.mp4",
        "published": "2017-02-10T00:52:26.108081",
        "length": 107
    },
    {
        "filmTitle": "Star Wars Episod III - Mörkrets Hämnd",
        "description": "Detta är filmen som länkar samman Stjärnornas krig och Star Wars: Episod II - Klonerna anfaller och svarar på frågor som hur Luke Skywalker hamnade hos sina fosterföräldrar, varför Yoda flydde och kanske den största frågan av dem alla - hur Anakin Skywalker blir Darth Vader.",
        "imageUrl": "http://dreamfilmhd.sh/images/imdb/0121766.jpg",
        "category": 3,
        "voters": 21,
        "resourceUrl": "http://185.152.64.96/2gru7v567bntzhru5347d5t2fbve5pj3elvt4ma6kqa5m6qjtnd2byi4av3a/v.mp4",
        "published": "2017-02-10T00:52:26.1070801",
        "length": 140
    },
    {
        "filmTitle": "Titanic",
        "description": "De kommer från skilda världar men deras hemliga passion är gränslös. Nu färdas de mot drömmarnas land i världens modernaste skepp. Hela livet ligger framför dem... vad skulle någonsin kunna skilja dem åt?",
        "imageUrl": "http://dreamfilmhd.sh/images/imdb/tt0120338.jpg",
        "category": 0,
        "voters": 11,
        "resourceUrl": "http://185.152.65.162/2grupxwg7bntzhru5377d3j5n5jhu7juonoi7w2dqfp4wo6a35ojgwvcnfoa/v.mp4",
        "published": "2017-02-10T00:52:26.108081",
        "length": 194
    },
    {
        "filmTitle": "War Dogs",
        "description": "Under det första Irak-kriget upptäcker två vänner i tjugoårsåldern, som bor i Miami, regeringens initiativ som tillåter småskaliga företag att buda på militära kontrakt. Baserad på en sann historia",
        "imageUrl": "http://dreamfilmhd.sh/images/imdb/tt2005151.jpg",
        "category": 1,
        "voters": 5,
        "resourceUrl": "http://185.152.65.173/2gruuzi77bntzhru532pdjr3ojihkd3n2g46sbfbhznk7jxwhawzskqf3imq/v.mp4",
        "published": "2017-02-10T00:52:26.108081",
        "length": 114
    }
]