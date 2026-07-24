import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Episode } from './pages/episode/episode';
import { People } from './pages/people/people';
import { Planets } from './pages/planets/planets';
import { Species } from './pages/species/species';
import { Vehicles } from './pages/vehicles/vehicles';

export const routes: Routes = [
     { path: '', component: Landing}, 
     { path: 'episode/:movie',  component: Episode },
     { path: 'people/:id', component: People },
     { path: '', component: Planets },
     { path: '', component: Species },
     { path: '', component: Vehicles},
       { path: '**',   redirectTo: '' }
];
