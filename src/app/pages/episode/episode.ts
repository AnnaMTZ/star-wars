import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    stream: () => this.swapiService.getFilms(),
  });

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

people = rxResource({
    stream: () => this.swapiService.getPeople(),
  });

  species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  vehicles = rxResource({
    stream: () => this.swapiService.getVehicles(),
  });

  starships = rxResource({
    stream: () => this.swapiService.getStarships(),
  });


getId(url: string): string {
  return url.split('/').pop() ?? '';
}

get currentFilm(): any | null {
  const films = this.films.value();

  if (!films) {
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