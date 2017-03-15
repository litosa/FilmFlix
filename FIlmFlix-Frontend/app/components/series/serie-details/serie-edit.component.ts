import { Serie } from '../../models/serie';
import { Category } from '../../enums/category';
import { Router } from '@angular/router';
import { SerieService } from '../../services/serie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
    selector: 'edit-serie',
    templateUrl: 'app/components/series/serie-details/serie-edit.component.html',
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


export class EditSerieComponent implements OnInit {
    @Output() editCurrentSerie = new EventEmitter();
    @Output() cancelEditSerie = new EventEmitter();
    @Input() filteredSerie: Serie;

    categories = Category;
    keys(): Array<string> {
        var keys = Object.keys(this.categories);
        return keys.slice(keys.length / 2);
    }

    serieEditForm: FormGroup;
    private serieTitle: FormControl;
    private description: FormControl;
    private imageUrl: FormControl;
    private category: FormControl;

    constructor(private serieService: SerieService, private router: Router) { }

    ngOnInit() {
        this.initForm();        
    }


    initForm() {

        this.serieTitle = new FormControl(this.filteredSerie.serieTitle, Validators.required);
        this.description = new FormControl(this.filteredSerie.description, Validators.required);
        this.imageUrl = new FormControl(this.filteredSerie.imageUrl, Validators.required);
        this.category = new FormControl('', Validators.required);

        //name, imageUrl etc matches formcontrol in html
        this.serieEditForm = new FormGroup({
            serieTitle: this.serieTitle,
            description: this.description,
            imageUrl: this.imageUrl,
            category: this.category
        });
    }

    editSerie(formValues: Serie) {
        this.editCurrentSerie.emit(formValues);
    }

    cancel() {
        this.cancelEditSerie.emit();
    }


}