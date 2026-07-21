import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { Game } from '../../features/game/game';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface EpisodeFacts {
  title: string;
  content: string;
}

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

 facts: EpisodeFacts[] = [];
currentFact?: EpisodeFacts;

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });

  answer = '';
  movieName = '';

  answerError = '';
  movieError = '';

    constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http
    .get<EpisodeFacts[]>('/assets/episodes.json')
    .subscribe(data => {
      this.facts = data;

      const randomIndex = Math.floor(Math.random() * data.length);
      this.currentFact = data[randomIndex];
    });
}

submitAnswer(): void {
  const answer = this.answer.trim().toLowerCase();

  if (!this.currentFact) {
    return;
  }

  const correctTitle = this.currentFact.title.trim().toLowerCase();

  if (answer === correctTitle) {
    this.answerError = '';
    this.answer = '';

  this.router.navigate(['/episode', this.currentFact.title]);
  } else {
    this.answerError = 'Come on! You know it!!';
  }
}

  goToMovie(): void {
    const movie = this.movieName.trim().toLowerCase();
    const films = this.films.value() ?? [];

    const matchingFilm = films.find(
      (film: any) => film.title.toLowerCase() === movie
    );

    if (matchingFilm) {
      this.movieError = '';
      this.router.navigate(['/episode', movie]);
    } else {
      this.movieError =
        "This episode wasn't filmed yet. Are you from the future?";
    }
  }
}
