import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Category } from '../enums/category';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';

//``
//@Input send data from parent to child
//@Output send data from child to parent
//#referenceVariable send/connect data both ways
@Component({
    template: `
    <div>
        <div>
            <h1>Series</h1>
            <span>
                <button class="btn btn-default"
                        (click)="sortSeries('votes')"> By Votes
                </button>
                <button class="btn btn-default"
                        (click)="sortSeries('name')"> By Name
                </button>
            </span>
            
            <div class="pull-right">
                <span>
                    <button class="btn btn-default" 
                            (click)="filterSeries('all')"> All
                    </button>
                </span>
                <span *ngFor="let category of keys()">
                    <button style="margin-left: -2px;" 
                            class="btn btn-default" 
                            (click)="filterSeries(category)"> {{category}}
                    </button>
                </span>   
            </div>     
        </div>
        <hr>

        <div class="row">
            <div class="col-sm-4 col-md-3" *ngFor="let serie of filteredSeries">
                <serie-thumbnail [serie]="serie"></serie-thumbnail>
            </div>
        </div>
    </div>
    `
})
export class SeriesListComponent implements OnInit {

    constructor(private serieService: SerieService) { }

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    series: Serie[] = [];
    filteredSeries: Serie[] = [];
    filterByNumber: number;
    sortBy: string = 'votes';


    ngOnInit() {
        this.series = this.serieService.series;
        this.filteredSeries = this.series.slice(0);
    }

    sortSeries(value: string) {
        this.sortBy === value ? this.filteredSeries.sort(sortByVotesDesc) : this.filteredSeries.sort(sortByNameAsc)
    }

    filterSeries(filter) {

        switch (filter) {
            case 'Drama':
                this.filterByNumber = 0;
                break;
            case 'Action':
                this.filterByNumber = 1;
                break;
            case 'Cartoon':
                this.filterByNumber = 2;
                break;
            case 'ScienceFiction':
                this.filterByNumber = 3;
                break;
            default:
                //Skapar en kopia av listan films
                this.filteredSeries = this.series.slice(0);
                return this.filteredSeries;
        }

        if (this.filterByNumber >= 0) {
            this.filteredSeries = this.series.filter(serie => {
                return serie.category === this.filterByNumber;
            })
        }
    }

}

function sortByNameAsc(s1: Serie, s2: Serie) {
    if (s1.serieTitle > s2.serieTitle) return 1
    else if (s1.serieTitle === s2.serieTitle) return 0
    else return -1
}

function sortByVotesDesc(s1: Serie, s2: Serie) {
    return s2.voters - s1.voters
}