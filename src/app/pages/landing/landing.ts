import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { Game } from '../../features/game/game';
import { Episode } from '../episode/episode';
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
  const movie = this.answer.trim().toLowerCase();

  const films = this.films.value() ?? [];

  const matchingFilm = films.find(
    (film: any) => film.title.toLowerCase() === movie
  );

  if (matchingFilm) {
    this.errorMessage = '';
    this.router.navigate(['/episode', movie]);
  } else {
    this.errorMessage = 'Incorrect answer. Try again!';
  }
}

goToMovie(): void {
  const movie = this.movieName.trim().toLowerCase();

  const films = this.films.value() ?? [];

  const matchingFilm = films.find(
    (film: any) => film.title.toLowerCase() === movie
  );

  if (matchingFilm) {
    this.errorMessage = '';
    this.router.navigate(['/episode', movie]);
  } else {
    this.errorMessage =
      "This episode wasn't filmed yet. Are you from the future?";
  }
}

}
