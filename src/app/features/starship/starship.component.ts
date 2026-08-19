import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import { extractIdFromUrl, getRelatedFilms, getRequiredRouteParam, toSlug } from '../../core/utils/route.utils';
import { Film, Starship } from '../../core/models';


@Component({
  selector: 'app-starship', 
  imports: [CommonModule, RouterLink],
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(SwapiService);
  readonly toSlug = toSlug;

readonly starshipId = getRequiredRouteParam(this.route, 'id');

  starships = rxResource({
    stream: () => this.swapiService.getStarships(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

readonly currentStarship = computed(() => {
  const starships = this.starships.value();

  if (!starships) {
    return null;
  }

  return (
    starships.find((starship: Starship) => {
      const id = extractIdFromUrl(starship.url);
      return id === this.starshipId;
    }) ?? null
  );
});

readonly relatedFilms = computed(() => {
  const starship = this.currentStarship();
  const films = this.films.value();

  return getRelatedFilms(
    starship?.films,
    films
  );
});
}



