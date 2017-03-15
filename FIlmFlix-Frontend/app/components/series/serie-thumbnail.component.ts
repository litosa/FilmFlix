import { AuthService } from '../services/auth.service';
import { SerieService } from '../services/serie.service';
import { Serie } from '../models/serie';
import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
    selector: 'serie-thumbnail',
    template: `
        <div [routerLink]="['/series', serie.serieTitle]" *ngIf="serie" 
                                                           class="clearfix well hoverwell thumbnail">
            <h5 class="text-center">{{serie.serieTitle}}
                <i *ngIf="serie.voters > 4"
                    class="glyphicon glyphicon-fire"
                    style="color:red">
                </i>
            </h5>
            <img class="img-responsive" style="margin-bottom:15px;" src="{{serie.imageUrl}}">
            <a *ngIf="auth.isAuthenticated()" class="btn btn-danger" id="deleteSerie" (click)="deleteSerie($event)">Delete Serie</a>
        </div>
        <div *ngIf="!serie"><p>Serie Is Not Available</p></div>
    `,
    styles: [`
        .thumbnail: {max-height:100px;}
        img {max-height:100px;}
        h2 {color:#bbb;}
        a {text-align: center; display:block;}
    `]
})

export class SerieThumbnailComponent {

    @Input() serie: Serie;
    series: Serie[];

    constructor(private serieService: SerieService, private auth: AuthService) { }

    deleteSerie(event) {

        event.stopPropagation();

        if (event.target.id == 'deleteFilm') {

            this.series = this.serieService.series;
            let index = this.series.indexOf(this.serie);
            this.serieService.deleteSerie(index);
        }
    }

}
