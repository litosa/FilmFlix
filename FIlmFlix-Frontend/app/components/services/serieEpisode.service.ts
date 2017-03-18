import { SerieService } from './serie.service';
import { SerieEpisode } from '../models/serieEpisode';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Category } from '../enums/category';
import { Serie } from '../models/serie';
import { EventEmitter, Injectable } from '@angular/core';

//Injectable möjliggör dependency injection
//om en service använder sig av andra services tex http
@Injectable()
export class SerieEpisodeService {

    serieEpisode: SerieEpisode[] = [];
    seriesUrl: string = 'http://localhost:8088/api/series/';

    constructor(private http: Http,
        private serieService: SerieService) { }

    saveSerieEpisode(serie: Serie, serieEpisode: SerieEpisode): Promise<Serie> {

        let index = this.serieService.series.findIndex(x => x.serieTitle == serie.serieTitle);
        index++;

        const body = JSON.stringify(serieEpisode);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .post(this.seriesUrl + index + '/serieepisodes', body, { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    updateEpisode(oldTitle: any, serieEpisode: SerieEpisode, serie: Serie): Promise<Serie> {

        let index = this.serieService.series.findIndex(x => x.serieTitle == serie.serieTitle);
        index++;

        const body = JSON.stringify(serieEpisode);
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http
            .put(this.seriesUrl + index + '/serieepisodes/' + oldTitle, body, { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    deleteEpisode(serie: Serie, serieEpisode: SerieEpisode): Promise<void> {

        let episodeTitle: string;
        let indexSerie = this.serieService.series.findIndex(x => x.serieTitle == serie.serieTitle);
        indexSerie++;
        let filteredSerie = this.serieService.series.find(x => x.serieTitle == serie.serieTitle);
        let indexEpisode = filteredSerie.serieEpisodes.findIndex(x => x.episodeTitle == serieEpisode.episodeTitle);

        filteredSerie.serieEpisodes.splice(indexEpisode, 1);

        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.delete(this.seriesUrl + indexSerie + '/serieepisodes/' + serieEpisode.episodeTitle, { headers: headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
