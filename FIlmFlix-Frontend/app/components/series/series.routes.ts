import { CreateEpisodeComponent } from './serie-details/serieEpisode-create.component';
import { Routes } from '@angular/router';
import { SerieCreateComponent } from './serie-create.component';
import { SeriesListComponent } from './series-list.component';
import { SerieRouteActivator } from '../common/serie-route-activator.service';
import { SerieDetailsComponent } from './serie-details/serie-details.component';



//This will come after routeparam series/...
export const SERIE_ROUTES: Routes = [
    { path: '', component: SeriesListComponent },
    { path: 'new', component: SerieCreateComponent },
    { path: ':serieTitle', component: SerieDetailsComponent },
    // { path: 'serieEpisode/new', component: CreateEpisodeComponent }
];
