import { SerieEpisode } from '../../models/serieEpisode';
import { Router } from '@angular/router';
import { SerieService } from '../../services/serie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
    selector: 'edit-episode',
    templateUrl: 'app/components/series/serie-details/serieEpisode-edit.component.html',
    styles: [`
     em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error textarea {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder {color:#999;}
    .error ::-moz-placeholder {color:#999;}
    .error :-moz-placeholder {color:#999;}
    .error :-ms-input-placeholder {color:#999;}
  `]
})


export class EditEpisodeComponent implements OnInit {

    @Output() editCurrentEpisode = new EventEmitter();
    @Output() cancelEditEpisode = new EventEmitter();
    @Input() serieEpisode; 

    episodeForm: FormGroup;
    //When private episodeForm.controls.* is needed in template
    private episodeTitle: FormControl;
    private resourceUrl: FormControl;
    private length: FormControl;

    constructor(private serieService: SerieService, private router: Router) { }

    ngOnInit() {
        this.initForm();
    }


    initForm() {

        this.episodeTitle = new FormControl(this.serieEpisode.episodeTitle, Validators.required);
        this.resourceUrl = new FormControl(this.serieEpisode.resourceUrl, Validators.required);
        this.length = new FormControl(this.serieEpisode.length, Validators.required);

        //name, imageUrl etc matches formcontrol in html
        this.episodeForm = new FormGroup({
            episodeTitle: this.episodeTitle,
            resourceUrl: this.resourceUrl,
            length: this.length
        });
    }

    editEpisode(formValues: SerieEpisode) {
        this.editCurrentEpisode.emit(formValues);
    }

    cancel() {
        this.cancelEditEpisode.emit();
    }


}