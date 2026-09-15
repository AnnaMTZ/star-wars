import { Routes } from '@angular/router';


//added lazy loading for all pages, to check the difference in the browser 
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'episode/:movie',
    loadComponent: () =>
      import('./features/episode/episode.component').then(m => m.EpisodeComponent),
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./features/person/person.component').then(m => m.PersonComponent),
  },
  {
    path: 'planet/:id',
    loadComponent: () =>
      import('./features/planet/planet.component').then(m => m.PlanetComponent),
  },
  {
    path: 'specie/:id',
    loadComponent: () =>
      import('./features/specie/specie.component').then(m => m.SpecieComponent),
  },
  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import('./features/vehicle/vehicle.component').then(m => m.VehicleComponent),
  },
  {
    path: 'starship/:id',
    loadComponent: () =>
      import('./features/starship/starship.component').then(m => m.StarshipComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];