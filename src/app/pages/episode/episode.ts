import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';


interface EpisodeFact {
  title: string;
  content: string;
}

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})
export class Episode {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);

  readonly episodeName =
    this.route.snapshot.paramMap.get('movie') ?? '';

  episodeFact?: EpisodeFact;
  showCrawl = true;
  showFilmInfo = false;



films = rxResource({
  stream: () =>
    this.swapiService.getFilms().pipe(
      catchError(error => {
        console.error('Failed to load films', error);
        return throwError(() => error);
      })
    ),
});

planets = rxResource({
  stream: () =>
    this.swapiService.getPlanets().pipe(
      catchError(error => {
        console.error('Failed to load planets', error);
        return throwError(() => error);
      })
    ),
});

people = rxResource({
  stream: () =>
    this.swapiService.getPeople().pipe(
      catchError(error => {
        console.error('Failed to load people', error);
        return throwError(() => error);
      })
    ),
});

species = rxResource({
  stream: () =>
    this.swapiService.getSpecies().pipe(
      catchError(error => {
        console.error('Failed to load species', error);
        return throwError(() => error);
      })
    ),
});

vehicles = rxResource({
  stream: () =>
    this.swapiService.getVehicles().pipe(
      catchError(error => {
        console.error('Failed to load vehicles', error);
        return throwError(() => error);
      })
    ),
});

starships = rxResource({
  stream: () =>
    this.swapiService.getStarships().pipe(
      catchError(error => {
        console.error('Failed to load starships', error);
        return throwError(() => error);
      })
    ),
});


getId(url: string): string {
  return url.split('/').pop() ?? '';
}

get currentFilm(): any | null {
  const films = this.films.value();

  if (!Array.isArray(films)) {
    return null;
  }

  return (
    films.find((film: any) => {
      const title = film.properties?.title ?? film.title;

      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');

      return slug === this.episodeName.toLowerCase();
    }) ?? null
  );
}

  get backgroundImage(): string {
    if (!this.episodeName) {
      return '/assets/images/default.jpg';
    }

    const fileName = this.episodeName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    return `/assets/images/${fileName}.jpg`;
  }

  get backgroundStyle(): string {
    return `
      url('${this.backgroundImage}')
    `;
  }
}