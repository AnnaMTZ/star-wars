import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        m => m.LandingComponent,
      ),
  },

  {
    path: 'auth/callback',
    loadComponent: () =>
      import(
        './features/auth-callback/auth-callback.component'
      ).then(
        m => m.AuthCallbackComponent,
      ),
  },

  {
    path: 'episode/:movie',
    loadComponent: () =>
      import('./features/episode/episode.component').then(
        m => m.EpisodeComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: 'person/:id',
    loadComponent: () =>
      import('./features/person/person.component').then(
        m => m.PersonComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: 'planet/:id',
    loadComponent: () =>
      import('./features/planet/planet.component').then(
        m => m.PlanetComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: 'specie/:id',
    loadComponent: () =>
      import('./features/specie/specie.component').then(
        m => m.SpecieComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import('./features/vehicle/vehicle.component').then(
        m => m.VehicleComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: 'starship/:id',
    loadComponent: () =>
      import('./features/starship/starship.component').then(
        m => m.StarshipComponent,
      ),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];