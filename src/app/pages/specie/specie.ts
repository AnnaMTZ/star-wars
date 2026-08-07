import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRequiredRouteParam, toSlug } from '../../shared/utils/route.utils';


@Component({
  selector: 'app-specie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './specie.html',
  styleUrls: ['./specie.scss'],
})
export class Specie {
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

  get currentSpecie(): any | null {
    const species = this.species.value();

    if (!species) {
      return null;
    }

    return (
      species.find((specie: any) => {
        const id = specie.url?.split('/').filter(Boolean).pop();
        return id === this.specieId;
      }) ?? null
    );
  }

  getFilmId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

  get relatedFilms(): any[] {
  const specie = this.currentSpecie;
  const films = this.films.value();

  if (!specie?.films?.length || !films) {
    return [];
  }

  return films.filter((film: any) =>
    specie.films.includes(film.url)
  );
}
}