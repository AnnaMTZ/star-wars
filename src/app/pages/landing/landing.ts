import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { Game } from '../../features/game/game';
import { ANewHope } from '../episode/episode';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
   standalone: true,
  imports: [Game, FormsModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing {

  private swapiService = inject(landingService);
private router = inject(Router);

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });
  
  answer = '';
  movieName = ''; 
  errorMessage = '';


  submitAnswer(): void {
    const normalizedAnswer = this.answer.trim().toLowerCase();

    if (normalizedAnswer === 'a new hope') {
      this.errorMessage = '';
      this.router.navigate(['/episode']);
    } else {
      this.errorMessage = 'Incorrect answer. Try again!';
    }
  }

goToMovie(): void {
  const routes: Record<string, string> = {
    'a new hope': '/a-new-hope',
    'the empire strikes back': '/empire-strikes-back',
    'return of the jedi': '/return-of-the-jedi'
  };

  const route = routes[this.movieName.trim().toLowerCase()];

  if (route) {
    this.router.navigate([route]);
  } else {
    this.errorMessage = 'This episode wasn\'t filmed yet. Are you from the future?';
  }
}

}
