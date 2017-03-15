import { Http } from '@angular/http';
import { Category } from '../enums/category';
import { Serie } from '../models/serie';
import { EventEmitter, Injectable } from '@angular/core';

//Injectable möjliggör dependency injection
//om en service använder sig av andra services tex http
@Injectable()
export class SerieService {

    series: Serie[] = [];

    constructor(private http: Http) {
        this.getSeries();
    }

    getSeries() {
        this.http.get('http://localhost:8088/api/series/')
            .map(response => <Serie[]>response.json())
            .subscribe(
                data => this.series = data,
                error => console.error(error)
            );
    }


    getSerie(serieTitle: string) {
        return this.series.find(serie => serie.serieTitle.toLowerCase() == serieTitle.toLowerCase());
    }

    saveSerie(serie: Serie) {
        serie.serieEpisodes = [];
        //Convert Enum to number
        var category: Category = Category[serie.category.toString()];
        serie.category = category;
        SERIES.push(serie);
    }

    updateSerie(serie: Serie) {
        let index = SERIES.findIndex(x => x.serieTitle == serie.serieTitle);
        SERIES[index] = serie;
    }

    deleteSerie(index: number) {
        SERIES.splice(index, 1);
    }
}

const SERIES = [
    {
        "serieTitle": "Narcos",
        "description": "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.",
        "imageUrl": "http://dreamvtt.com/imagehost/data/uploads/users/d6f6fbc6-d319-4a61-b845-8dff671462d7/24174987.jpg",
        "category": 0,
        "voters": 5,
        "serieEpisodes": [
            {
                "episodeTitle": "Avsnitt1",
                "resourceUrl": "http://185.152.64.168/2grurw6f7bntzhru5377d6jzp24hdrierkaafwooatlbn6lm2ckvjbfyby6a/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            },
            {
                "episodeTitle": "Avsnitt2",
                "resourceUrl": "http://185.152.64.168/2grurwgf7bntzhru5377d6lzphbtcbimfzmg4664uizccf7jo2b3zubp7qcq/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            },
            {
                "episodeTitle": "Avsnitt3",
                "resourceUrl": "http://185.152.64.168/2grurxof7bntzhru5377dyrjnn5nnvrmi46pptjnzyw4jhu3rtvn5qpik6pq/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            }
        ]
    },
    {
        "serieTitle": "Hablo Escobar",
        "description": "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.",
        "imageUrl": "http://dreamvtt.com/imagehost/data/uploads/users/d6f6fbc6-d319-4a61-b845-8dff671462d7/24174987.jpg",
        "category": 1,
        "voters": 2,
        "serieEpisodes": [
            {
                "episodeTitle": "Avsnitt1",
                "resourceUrl": "http://185.152.64.168/2grurw6f7bntzhru5377d6jzp24hdrierkaafwooatlbnfgmkpsse4bcvera/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            },
            {
                "episodeTitle": "Avsnitt2",
                "resourceUrl": "http://185.152.64.168/2grurwgf7bntzhru5377d6lzphbtcbimfzmg4664uizcc6sj6xz75mr6aa5a/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            },
            {
                "episodeTitle": "Avsnitt3",
                "resourceUrl": "http://185.152.64.168/2grurxof7bntzhru5377dyrjnn5nnvrmi46pptjnzyw4j4z3b6ncsiyy34jq/v.mp4",
                "published": "2017-02-10T00:52:26.108081",
                "length": 45
            }
        ]
    }
]