import { SerieEpisodeService } from '../../services/serieEpisode.service';
import { Category } from '../../enums/category';
import { AuthService } from '../../services/auth.service';
import { SerieEpisode } from '../../models/serieEpisode';
import { Serie } from '../../models/serie';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
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
    serieUpdate: string;
    serieEpisode: SerieEpisode;
    private displayDate: any;


    constructor(private serieService: SerieService,
        private serieEpisodeService: SerieEpisodeService,
        private route: ActivatedRoute,
        private auth: AuthService,
        private router: Router) { }

    //TODO: Kolla values och jämför istället för keys
    ngOnInit() {
        this.subscription = this.route.params.subscribe(
            (params: any) => {
                this.serieTitle = params['serieTitle'];
                this.serieService.getSeriesFromLocalStorage();
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


    //// Config Serie Episodes

    addEpisode() {
        this.addMode = true;
    }

    saveNewEpisode(serieEpisode: SerieEpisode) {
        this.filteredSerie.serieEpisodes.push(serieEpisode);
        this.serieEpisodeService.saveSerieEpisode(this.filteredSerie, serieEpisode);
        this.addMode = false;
    }

    cancelNewEpisode() {
        this.addMode = false;
    }

    editEpisode(episodeTitle: string) {
        this.filteredEditEpisodeBySerie = this.filteredSerie.serieEpisodes.find(s => s.episodeTitle === episodeTitle);
        this.editMode = true;
    }

    editCurrentEpisode(serieEpisodeUpdate: any) {
        
        let oldTitle = serieEpisodeUpdate.oldEpisodeTitle;
        this.displayDate = new Date().toLocaleDateString();

        this.serieEpisode = this.filteredSerie.serieEpisodes.find(se => se.episodeTitle == serieEpisodeUpdate.oldEpisodeTitle);
        this.serieEpisode.episodeTitle = serieEpisodeUpdate.episodeTitle;
        this.serieEpisode.resourceUrl = serieEpisodeUpdate.resourceUrl;
        this.serieEpisode.published = this.displayDate;
        this.serieEpisode.length = serieEpisodeUpdate.length;

        // this.filteredSerie.serieEpisodes[this.filteredSerie.serieEpisodes.indexOf(this.filteredEditEpisodeBySerie)] = serieEpisodeUpdate;
        this.serieEpisodeService.updateEpisode(oldTitle, this.serieEpisode, this.filteredSerie);
        this.editMode = false;
    }

    cancelEditEpisode() {
        this.editMode = false;
    }


    deleteEpisode(serieEpisode: SerieEpisode) {
        this.serieEpisodeService.deleteEpisode(this.filteredSerie, serieEpisode);
    }

    selectEpisode(episodeTitle: any) {

        if (this.reload) {
            location.reload();
            this.reload = false;
        }

        this.filteredEpisodeBySerie = this.filteredSerie.serieEpisodes.find(s => s.episodeTitle === episodeTitle);
        this.reload = true;
    }


    //// Config Serie

    editSerie() {
        this.editSerieMode = true;
    }

    editCurrentSerie(serie: Serie) {

        this.serieUpdate = this.filteredSerie.serieTitle;

        // Alternativ to the code below
        // this.filteredSerie = serie;

        this.filteredSerie.serieTitle = serie.serieTitle;
        this.filteredSerie.description = serie.description;
        this.filteredSerie.imageUrl = serie.imageUrl;
        this.filteredSerie.category = serie.category;

        var categoryByName = this.keys();

        for (var i = 0; i < categoryByName.length; i++) {
            if (categoryByName[i] === this.filteredSerie.category.toString()) {

                this.serieCategory = categoryByName[i];

            }
        }

        this.serieService.updateSerie(this.serieUpdate, this.filteredSerie);
        this.editSerieMode = false;
    }

    cancelEditSerie() {
        this.editSerieMode = false;
    }

    deleteSerie() {
        this.serieService.deleteSerie(this.filteredSerie);
        this.router.navigate(['/series']);
    }

}