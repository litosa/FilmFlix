import { HomepageComponent } from './components/common/homepage';
import { SerieEpisodeService } from './components/services/serieEpisode.service';
import { ModalTriggerDirective } from './components/common/modal-trigger.directive';
import { JQ_TOKEN } from './components/common/jQuery.service';
import { SearchModalComponent } from './components/common/search-modal.component';
import { EditSerieComponent } from './components/series/serie-details/serie-edit.component';
import { EditFilmComponent } from './components/films/film-details/film-edit.component';
import { EditEpisodeComponent } from './components/series/serie-details/serieEpisode-edit.component';
import { CreateEpisodeComponent } from './components/series/serie-details/serieEpisode-create.component';
import { AuthService } from './components/services/auth.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/admin/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { SerieEpisodeComponent } from './components/series/serie-details/serie-episode.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FilmsComponent } from './components/films/films.component';
import { SeriesComponent } from './components/series/series.component';
import { FilmCreateComponent } from './components/films/film-create.component';
import { FilmRouteActivator } from './components/common/film-route-activator.service';
import { FilmService } from './components/services/film.service';
import { FilmDetailsComponent } from './components/films/film-details/film-details.component';
import { SerieRouteActivator } from './components/common/serie-route-activator.service';
import { Error404Component } from './components/common/404.component';
import { SerieCreateComponent } from './components/series/serie-create.component';
import { routing } from './app.route';
import { RouterModule } from '@angular/router';
import { SerieDetailsComponent } from './components/series/serie-details/serie-details.component';
import { Toastr, TOASTR_TOKEN } from './components/common/toastr.service';
import { SerieService } from './components/services/serie.service';
import { FilmThumbnailComponent } from './components/films/film-thumbnail.component';
import { FilmsListComponent } from './components/films/films-list.component';
import { SerieThumbnailComponent } from './components/series/serie-thumbnail.component';
import { SeriesListComponent } from './components/series/series-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideosAppComponent } from './videos-app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

declare let toastr: Toastr;
declare let jQuery: Object;


@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        VideosAppComponent,
        FilmsComponent,
        FilmsListComponent,
        FilmThumbnailComponent,
        FilmDetailsComponent,
        FilmCreateComponent,
        EditFilmComponent,
        SeriesComponent,
        SeriesListComponent,
        SerieThumbnailComponent,
        SerieDetailsComponent,
        SerieCreateComponent,
        EditSerieComponent,
        SerieEpisodeComponent,
        CreateEpisodeComponent,
        EditEpisodeComponent,
        AdminComponent,
        LoginComponent,
        NavbarComponent,
        Error404Component,
        SearchModalComponent,
        ModalTriggerDirective,
        HomepageComponent
    ],
    bootstrap: [VideosAppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        SerieService,
        FilmService,
        SerieEpisodeService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        SerieRouteActivator,
        FilmRouteActivator,
        AuthService
    ]
})

export class AppModule { }