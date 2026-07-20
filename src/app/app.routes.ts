import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Episode } from './pages/episode/episode';
import { Game } from './features/game/game';

export const routes: Routes = [
     { path: '', component: Landing}, 
     { path: 'episode/:movie',  component: Episode },
     { path: 'app-game', component: Game }
];
