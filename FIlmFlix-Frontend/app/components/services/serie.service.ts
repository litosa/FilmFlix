import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../enums/category';
import { Serie } from '../models/serie';
import { EventEmitter, Injectable } from '@angular/core';

//Injectable möjliggör dependency injection
//om en service använder sig av andra services tex http
@Injectable()
export class SerieService {

    series: Serie[] = [];
    seriesUrl: string = 'http://localhost:8088/api/series/';


    constructor(private http: Http) {
        this.getSeries();
    }

    getSeries() {
        this.http.get(this.seriesUrl)
            .map(response => <Serie[]>response.json())
            .subscribe(
            data => this.series = data,
            error => console.error(error)
            );
    }

    setSeriesToLocalStorage(series: Serie[]){
        localStorage.setItem("series", JSON.stringify(series));        
    }

    getSeriesFromLocalStorage() {
        this.series = JSON.parse(localStorage.getItem("series"));
    }

    getSerie(serieTitle: string) {
        return this.series.find(serie => serie.serieTitle.toLowerCase() == serieTitle.toLowerCase());
    }

    saveSerie(serie: Serie): Promise<Serie> {
        serie.serieEpisodes = [];
        //Convert Enum to number
        var category: Category = Category[serie.category.toString()];
        serie.category = category;

        this.series.push(serie);

        const body = JSON.stringify(serie);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .post(this.seriesUrl, body, { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    updateSerie(serieTitle: string, serie: Serie): Promise<Serie> {

        let category: Category = Category[serie.category.toString()];
        serie.category = category;

        let index = this.series.findIndex(x => x.serieTitle == serieTitle);
        this.series[index] = serie;

        const body = JSON.stringify(serie);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .put(this.seriesUrl + serieTitle, body, { headers: headers })
            .toPromise()
            .then(() => serie)
            .catch(this.handleError);
    }

    deleteSerie(serie: Serie): Promise<void> {

        let index = this.series.findIndex(x => x.serieTitle == serie.serieTitle);
        this.series.splice(index, 1);

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.seriesUrl + serie.serieTitle, { headers: headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}