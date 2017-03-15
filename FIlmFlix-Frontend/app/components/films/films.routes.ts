import { Routes } from '@angular/router';
import { FilmsListComponent } from './films-list.component';
import { FilmCreateComponent } from './film-create.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmRouteActivator } from '../common/film-route-activator.service';




//This will come after routeparam films/...
export const FILM_ROUTES: Routes = [
    { path: '', component: FilmsListComponent },
    { path: 'new', component: FilmCreateComponent },
    { path: ':filmTitle', component: FilmDetailsComponent },
    // { path: ':filmTitle/edit', component: PizzaEditComponent }
];