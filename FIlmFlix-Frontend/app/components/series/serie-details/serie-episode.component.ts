import { SerieEpisode } from '../../models/serieEpisode';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';



@Component({
    selector: 'serie-episode',
    template: `
        <div *ngIf="serieEpisode" class="clearfix">
            <h6>{{serieEpisode?.episodeTitle}}</h6>
            <video width="400px" height="255px" controls="controls" preload="metadata" loop id="bgvid">
                <source src={{serieEpisode?.resourceUrl}} type="video/mp4" />
            </video>
        </div>
    `,
    styles: [`
        
    `]
})

export class SerieEpisodeComponent implements OnInit, OnChanges {

    @Input() serieEpisode: SerieEpisode;
    private test: SerieEpisode;


    constructor() { }

    ngOnInit() {
        
    }

    ngOnChanges(changes) {

        if (changes.serieEpisode.currentValue != undefined) {

            this.serieEpisode = changes.serieEpisode.currentValue;

        }
    }

}
