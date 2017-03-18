import { Film } from '../models/film';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../enums/category';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
    templateUrl: 'app/components/films/film-create.component.html',
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

export class FilmCreateComponent{

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    filmForm: FormGroup;
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

    private initForm() {

        this.filmTitle = new FormControl('', Validators.required);
        this.description = new FormControl('', Validators.required);
        this.imageUrl = new FormControl('', Validators.required);
        this.category = new FormControl('', Validators.required);
        this.resourceUrl = new FormControl('', Validators.required);
        this.length = new FormControl('', Validators.required);

        //name, imageUrl etc matches formcontrol in html
        this.filmForm = new FormGroup({
            filmTitle: this.filmTitle,
            description: this.description,
            imageUrl: this.imageUrl,
            category: this.category,
            resourceUrl: this.resourceUrl,
            length: this.length
        });
    }


    saveFilm(formValues: Film) {
        this.filmService.saveFilm(formValues);
        this.router.navigate(['/films']);
    }

    cancel(){
        this.router.navigate(['/films']);
    }

}