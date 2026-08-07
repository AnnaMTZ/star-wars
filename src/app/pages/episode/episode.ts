import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, throwError } from 'rxjs';
import { landingService } from '../../services/landing.service/landing.service';
import { toSlug, extractIdFromUrl } from '../../shared/utils/route.utils';

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
  readonly toSlug = toSlug;
  // readonly id = extractIdFromUrl(film.url);

constructor() {
  effect(() => {
    console.log('Current Film:', this.currentFilm());
  });
}
  
  readonly episodeName =
    this.route.snapshot.paramMap.get('movie') ?? '';

  showCrawl = true;
  showFilmInfo = false;

  // readonly in order not to be reassigned
  readonly films = rxResource({
    stream: () =>
      this.swapiService.getFilms().pipe(
        catchError(error => {
          console.error('Failed to load films', error);
          return throwError(() => error);
        })
      ),
  });

  readonly planets = rxResource({
    stream: () =>
      this.swapiService.getPlanets().pipe(
        catchError(error => {
          console.error('Failed to load planets', error);
          return throwError(() => error);
        })
      ),
  });

  readonly people = rxResource({
    stream: () =>
      this.swapiService.getPeople().pipe(
        catchError(error => {
          console.error('Failed to load people', error);
          return throwError(() => error);
        })
      ),
  });

  readonly species = rxResource({
    stream: () =>
      this.swapiService.getSpecies().pipe(
        catchError(error => {
          console.error('Failed to load species', error);
          return throwError(() => error);
        })
      ),
  });

  readonly vehicles = rxResource({
    stream: () =>
      this.swapiService.getVehicles().pipe(
        catchError(error => {
          console.error('Failed to load vehicles', error);
          return throwError(() => error);
        })
      ),
  });

  readonly starships = rxResource({
    stream: () =>
      this.swapiService.getStarships().pipe(
        catchError(error => {
          console.error('Failed to load starships', error);
          return throwError(() => error);
        })
      ),
  });

  // computed() derives values from signals/resources
  readonly currentFilm = computed(() => {
    const films = this.films.value();

    if (!Array.isArray(films)) {
      return null;
    }

    const film = films.find((film: any) => {
      const title = film.properties?.title ?? film.title;

      return (
        this.toSlug(title) ===
        this.episodeName.toLowerCase()
      );
    });

    if (!film) {
      return null;
    }

    return {
      ...film,
      title: film.properties?.title ?? film.title,
      episodeId:
        film.properties?.episode_id ?? film.episode_id,
      openingCrawl:
        film.properties?.opening_crawl ??
        film.opening_crawl,
      director:
        film.properties?.director ?? film.director,
      producer:
        film.properties?.producer ?? film.producer,
      releaseDate:
        film.properties?.release_date ??
        film.release_date,
    };
  });

  readonly characters = computed(() => {
    const film = this.currentFilm();
    const people = this.people.value();

    if (!film || !Array.isArray(people)) {
      return [];
    }

    return people.filter((person: any) =>
      person.films?.includes(film.url)
    );
  });

  readonly filmPlanets = computed(() => {
    const film = this.currentFilm();
    const planets = this.planets.value();

    if (!film || !Array.isArray(planets)) {
      return [];
    }

    return planets.filter((planet: any) =>
      planet.films?.includes(film.url)
    );
  });

  readonly filmSpecies = computed(() => {
    const film = this.currentFilm();
    const species = this.species.value();

    if (!film || !Array.isArray(species)) {
      return [];
    }

    return species.filter((specie: any) =>
      specie.films?.includes(film.url)
    );
  });

  readonly filmVehicles = computed(() => {
    const film = this.currentFilm();
    const vehicles = this.vehicles.value();

    if (!film || !Array.isArray(vehicles)) {
      return [];
    }

    return vehicles.filter((vehicle: any) =>
      vehicle.films?.includes(film.url)
    );
  });

  readonly filmStarships = computed(() => {
    const film = this.currentFilm();
    const starships = this.starships.value();

    if (!film || !Array.isArray(starships)) {
      return [];
    }

    return starships.filter((starship: any) =>
      starship.films?.includes(film.url)
    );
  });

  readonly backgroundImage = computed(() => {
    if (!this.episodeName) {
      return '/assets/images/default.jpg';
    }

    return `/assets/images/${this.toSlug(
      this.episodeName
    )}.jpg`;
  });

  readonly backgroundStyle = computed(
    () => `url('${this.backgroundImage()}')`
  );

  getId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

}