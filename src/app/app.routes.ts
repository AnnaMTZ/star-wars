import { Routes } from '@angular/router';


//added lazy loading for all pages, to check the difference in the browser 
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'episode/:movie',
    loadComponent: () =>
      import('./components/episode/episode.component').then(m => m.EpisodeComponent),
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./components/person/person.component').then(m => m.PersonComponent),
  },
  {
    path: 'planet/:id',
    loadComponent: () =>
      import('./components/planet/planet.component').then(m => m.PlanetComponent),
  },
  {
    path: 'specie/:id',
    loadComponent: () =>
      import('./components/specie/specie.component').then(m => m.SpecieComponent),
  },
  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import('./components/vehicle/vehicle.component').then(m => m.VehicleComponent),
  },
  {
    path: 'starship/:id',
    loadComponent: () =>
      import('./components/starship/starship.component').then(m => m.StarshipComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];