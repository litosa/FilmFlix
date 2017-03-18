import { Category } from '../enums/category';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Serie } from '../models/serie';
import { SerieService } from '../services/serie.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// ` `
@Component({
    templateUrl: 'app/components/series/serie-create.component.html',
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

export class SerieCreateComponent implements OnInit {

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    serieForm: FormGroup;
    private serieTitle: FormControl;
    private imageUrl: FormControl;
    private description: FormControl;
    private category: FormControl;


    constructor(private serieService: SerieService, private router: Router) { }

    ngOnInit() {

        this.initForm();
    }

    private initForm() {

        this.serieTitle = new FormControl('', Validators.required);
        this.imageUrl = new FormControl('', Validators.required);
        this.description = new FormControl('', Validators.required);
        this.category = new FormControl('', Validators.required);

        //name, imageUrl etc matches formcontrol in html
        this.serieForm = new FormGroup({
            serieTitle: this.serieTitle,
            imageUrl: this.imageUrl,
            description: this.description,
            category: this.category
        });
    }


    saveSerie(formValues: Serie) {
        this.serieService.saveSerie(formValues);
        this.router.navigate(['/series']);
    }

    cancel() {
        this.router.navigate(['/series']);
    }

}

