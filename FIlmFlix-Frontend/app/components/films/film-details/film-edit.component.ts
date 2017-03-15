import { Category } from '../../enums/category';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { Router } from '@angular/router';
import { SerieService } from '../../services/serie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
    selector: 'edit-film',
    templateUrl: 'app/components/films/film-details/film-edit.component.html',
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


export class EditFilmComponent implements OnInit {
    @Output() editCurrentFilm = new EventEmitter();
    @Output() cancelEditFilm = new EventEmitter();
    @Input() filteredFilm: Film;

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    filmEditForm: FormGroup;
    private filmTitle: FormControl;
    private description: FormControl;
    private imageUrl: FormControl;
    private category: FormControl;
    private resourceUrl: FormControl;
    private length: FormControl;

    constructor(private filmService: FilmService, private router: Router) { }

    ngOnInit() {
        this.initForm();        
    }


    initForm() {

        this.filmTitle = new FormControl(this.filteredFilm.filmTitle, Validators.required);
        this.description = new FormControl(this.filteredFilm.description, Validators.required);
        this.imageUrl = new FormControl(this.filteredFilm.imageUrl, Validators.required);
        this.category = new FormControl('', Validators.required);
        this.resourceUrl = new FormControl(this.filteredFilm.resourceUrl, Validators.required);
        this.length = new FormControl(this.filteredFilm.length, Validators.required);

        //name, imageUrl etc matches formcontrol in html
        this.filmEditForm = new FormGroup({
            filmTitle: this.filmTitle,
            description: this.description,
            imageUrl: this.imageUrl,
            category: this.category,
            resourceUrl: this.resourceUrl,
            length: this.length
        });
    }

    editFilm(formValues: Film) {
        this.editCurrentFilm.emit(formValues);
    }

    cancel() {
        this.cancelEditFilm.emit();
    }


}