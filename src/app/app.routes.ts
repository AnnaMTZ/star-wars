import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Episode } from './pages/episode/episode';
import { Planet } from './pages/planet/planet';
import { Specie } from './pages/specie/specie';
import { Vehicle } from './pages/vehicle/vehicle';
import { Starship } from './pages/starship/starship';
import { Person } from './pages/person/person';

export const routes: Routes = [
     { path: '', component: Landing}, 
     { path: 'episode/:movie',  component: Episode },
     { path: 'person/:id', component: Person },             
     { path: 'planet/:id', component: Planet },
     { path: 'specie/:id', component: Specie },
     { path: 'vehicle/:id', component: Vehicle},
     { path: 'starship/:id', component: Starship},
       { path: '**',   redirectTo: '' }
];
