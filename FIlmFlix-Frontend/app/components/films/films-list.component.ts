import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Category } from '../enums/category';
import { selector } from 'rxjs/operator/publish';
import { Component, OnChanges, OnInit, style } from '@angular/core';

//``
//@Input send data from parent to child
//@Output send data from child to parent
//#referenceVariable send/connect data both ways
@Component({
    template: `
    <div>        
        <div>
            <h1>Films</h1>
            <span>
                <button class="btn btn-default"
                        (click)="sortFilms('votes')"> By Votes
                </button>
                <button class="btn btn-default"
                        (click)="sortFilms('name')"> By Name
                </button>
            </span>
            
            <div class="pull-right">
                <span>
                    <button class="btn btn-default" 
                            (click)="filterFilms('all')"> All
                    </button>
                </span>
                <span *ngFor="let category of keys()">
                    <button style="margin-left: -2px;" 
                            class="btn btn-default" 
                            (click)="filterFilms(category)"> {{category}}
                    </button>
                </span>
            </div>     
        </div>
        <hr>

        <div class="row">            
            <div class="col-sm-4 col-md-3" *ngFor="let film of filteredFilms">
                <film-thumbnail [film]="film"></film-thumbnail>
            </div>
        </div>        
    </div>
    `
})
export class FilmsListComponent implements OnInit {

    constructor(private filmService: FilmService) { }

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    films: Film[] = [];
    filteredFilms: Film[] = [];
    filterByNumber: number;
    sortBy: string = 'votes';

    ngOnInit() {
        this.films = this.filmService.films;
        this.filteredFilms = this.films.slice(0);
        this.sortBy === this.sortBy ? this.filteredFilms.sort(sortByVotesDesc) : this.filteredFilms.sort(sortByNameAsc)
    }

    sortFilms(value: string) {
        this.sortBy === value ? this.filteredFilms.sort(sortByVotesDesc) : this.filteredFilms.sort(sortByNameAsc)
    }

    filterFilms(filter) {

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
                this.filteredFilms = this.films.slice(0);
                return this.filteredFilms;
        }

        if (this.filterByNumber >= 0) {
            this.filteredFilms = this.films.filter(film => {
                return film.category === this.filterByNumber;
            })
        }
    }

}

function sortByNameAsc(f1: Film, f2: Film) {
    if (f1.filmTitle > f2.filmTitle) return 1
    else if (f1.filmTitle === f2.filmTitle) return 0
    else return -1
}

function sortByVotesDesc(f1: Film, f2: Film) {
    return f2.voters - f1.voters
}
