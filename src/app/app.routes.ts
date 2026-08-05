import { Routes } from '@angular/router';


//added lazy loading for all pages, to check the difference in the browser 
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then(m => m.Landing),
  },
  {
    path: 'episode/:movie',
    loadComponent: () =>
      import('./pages/episode/episode').then(m => m.Episode),
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./pages/person/person').then(m => m.Person),
  },
  {
    path: 'planet/:id',
    loadComponent: () =>
      import('./pages/planet/planet').then(m => m.Planet),
  },
  {
    path: 'specie/:id',
    loadComponent: () =>
      import('./pages/specie/specie').then(m => m.Specie),
  },
  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import('./pages/vehicle/vehicle').then(m => m.Vehicle),
  },
  {
    path: 'starship/:id',
    loadComponent: () =>
      import('./pages/starship/starship').then(m => m.Starship),
  },
  {
    path: '**',
    redirectTo: '',
  },
];