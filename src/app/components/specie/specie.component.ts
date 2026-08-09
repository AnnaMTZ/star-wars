import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRequiredRouteParam, toSlug } from '../../core/utils/route.utils';
import { Planet, Film, Person, Specie, Vehicle, Starship } from '../../core/models';

@Component({
  selector: 'app-specie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.scss'],
})
export class SpecieComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);

  readonly specieId = getRequiredRouteParam(this.route, 'id');
  readonly toSlug = toSlug;

  species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  get currentSpecie(): Specie | null {
    const species = this.species.value();

    if (!species) {
      return null;
    }

    return (
      species.find((specie: Specie) => {
        const id = specie.url?.split('/').filter(Boolean).pop();
        return id === this.specieId;
      }) ?? null
    );
  }

  getFilmId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

  get relatedFilms(): Film[] {
  const specie = this.currentSpecie;
  const films = this.films.value();

  if (!specie?.films?.length || !films) {
    return [];
  }

  return films.filter((film: Film) =>
    specie.films.includes(film.url)
  );
}
}