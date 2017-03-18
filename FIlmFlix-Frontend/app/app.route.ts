import { HomepageComponent } from './components/common/homepage';
import { LoginComponent } from './components/admin/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { FilmsComponent } from './components/films/films.component';
import { SeriesComponent } from './components/series/series.component';
import { Error404Component } from './components/common/404.component';
import { RouterModule, Routes } from '@angular/router';
import { SERIE_ROUTES } from './components/series/series.routes';
import { FILM_ROUTES } from './components/films/films.routes';


const APP_ROUTES: Routes = [

    { path: '', component: HomepageComponent },    
    { path: 'series', component: SeriesComponent, children:SERIE_ROUTES },
    { path: 'films', component: FilmsComponent, children:FILM_ROUTES },
    { path: 'admin', component: AdminComponent },
    { path: 'admin/login', component: LoginComponent },
    { path: '404', component: Error404Component },
    { path: '**', component: Error404Component },
    // { path: '**', redirectTo: '/', pathMatch: 'full' }
];


export const routing = RouterModule.forRoot(APP_ROUTES);