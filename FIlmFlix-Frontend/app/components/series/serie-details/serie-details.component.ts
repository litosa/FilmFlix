import { Category } from '../../enums/category';
import { AuthService } from '../../services/auth.service';
import { SerieEpisode } from '../../models/serieEpisode';
import { Serie } from '../../models/serie';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { SerieService } from '../../services/serie.service';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: 'app/components/series/serie-details/serie-details.component.html',
    styles: [`
        .container: { padding-left:20px; padding-right:20px;}
        a { cursor: pointer }
    `]
})

export class SerieDetailsComponent implements OnInit {

    private subscription: Subscription;
    serieTitle: string;
    serie: Serie;
    filteredSerie: Serie;

    categories = Category;
    serieCategory: string;

    filteredEpisodeBySerie: SerieEpisode;
    filteredEditEpisodeBySerie: SerieEpisode;
    reload: boolean = false;
    addMode: boolean = false;
    editMode: boolean = false;
    editSerieMode: boolean = false;

    constructor(private serieService: SerieService,
        private route: ActivatedRoute,
        private auth: AuthService) { }

    //TODO: Kolla values och jämför istället för keys
    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.serieTitle = params['serieTitle'];
                this.filteredSerie = this.serieService.getSerie(this.serieTitle);
                var categoryByName = this.keys();

                for (var i = 0; i < categoryByName.length; i++) {
                    if (i === this.filteredSerie.category) {

                        this.serieCategory = categoryByName[i];

                    }
                }
            }
        );
    }


    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    addEpisode() {
        this.addMode = true;
    }
    editEpisode(episodeTitle: string) {
        this.filteredEditEpisodeBySerie = this.filteredSerie.serieEpisodes.find(s => s.episodeTitle === episodeTitle);
        this.editMode = true;
    }

    saveNewEpisode(serieEpisode: SerieEpisode) {
        this.filteredSerie.serieEpisodes.push(serieEpisode);
        this.serieService.updateSerie(this.filteredSerie);
        this.addMode = false;
    }

    cancelNewEpisode() {
        this.addMode = false;
    }


    editCurrentEpisode(serieEpisode: SerieEpisode) {

        this.filteredSerie.serieEpisodes[this.filteredSerie.serieEpisodes.indexOf(this.filteredEditEpisodeBySerie)] = serieEpisode;
        this.serieService.updateSerie(this.filteredSerie);
        this.editMode = false;
    }

    cancelEditEpisode() {
        this.editMode = false;
    }


    deleteEpisode(index: number) {
        this.filteredSerie.serieEpisodes.splice(index, 1);
        this.serieService.updateSerie(this.filteredSerie);
    }

    selectEpisode(episodeTitle: any) {
        
        //Doesnt work beacuse browser dont reload new selected video
        //this.filteredEpisodeBySerie = this.serie.serieEpisodes.find(s => s.episodeTitle === episodeTitle);

        if (this.reload) {
            location.reload();
            this.reload = false;
        }

        this.filteredEpisodeBySerie = this.filteredSerie.serieEpisodes.find(s => s.episodeTitle === episodeTitle);
        this.reload = true;
    }

    editSerie() {
        this.editSerieMode = true;
    }


    editCurrentSerie(serie: Serie) {
        
        this.filteredSerie.serieTitle = serie.serieTitle;
        this.filteredSerie.description = serie.description;
        this.filteredSerie.imageUrl = serie.imageUrl;
        this.filteredSerie.category = serie.category;

        // this.filteredSerie = serie;

        var categoryByName = this.keys();

        for (var i = 0; i < categoryByName.length; i++) {
            if (categoryByName[i] === this.filteredSerie.category.toString()) {

                this.serieCategory = categoryByName[i];

            }
        }

        this.serieService.updateSerie(this.filteredSerie);
        this.editSerieMode = false;
    }

    cancelEditSerie() {
        this.editSerieMode = false;
    }

}