import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import { extractIdFromUrl, getRelatedFilms, getRequiredRouteParam, toSlug } from '../../core/utils/route.utils';
import {  Specie } from '../../core/models';

@Component({
  selector: 'app-specie',
  imports: [CommonModule, RouterLink],
  templateUrl: './specie.component.html',
  styleUrls: ['./specie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecieComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(SwapiService);

  readonly specieId = getRequiredRouteParam(this.route, 'id');
  readonly toSlug = toSlug;

  species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

readonly currentSpecies = computed(() => {
  const species = this.species.value();

  if (!species) {
    return null;
  }

  return (
    species.find((specie: Specie) => {
      const id = extractIdFromUrl(specie.url);
      return id === this.specieId;
    }) ?? null
  );
});

readonly relatedFilms = computed(() => {
  const species = this.currentSpecies();
  const films = this.films.value();

  return getRelatedFilms(
    species?.films,
    films
  );
});

}