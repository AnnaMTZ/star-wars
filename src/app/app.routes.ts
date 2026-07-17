import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { ANewHope } from './pages/a-new-hope/a-new-hope';
import { Game } from './features/game/game';

export const routes: Routes = [

    {
        path: '',
        component: Landing
    }, 
     { path: 'a-new-hope', component: ANewHope },
     { path: 'app-game', component: Game }
];
