import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import { getRequiredRouteParam, getRelatedFilms, toSlug } from '../../core/utils/route.utils';
import { Planet } from '../../core/models';

@Component({
  selector: 'app-planet',
  imports: [CommonModule, RouterLink],
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetComponent {
  [x: string]: any;
  private route = inject(ActivatedRoute);
  private swapiService = inject(SwapiService);
  readonly planetId = getRequiredRouteParam(this.route, 'id');
  readonly toSlug = toSlug;

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

readonly currentPlanet = computed(() => {
  const planets = this.planets.value();

  if (!planets) {
    return null;
  }

  return (
    planets.find((planet: Planet) => {
      const id = planet.url?.split('/').filter(Boolean).pop();
      return id === this.planetId;
    }) ?? null
  );
});

readonly relatedFilms = computed(() => {
  const planet = this.currentPlanet();
  const films = this.films.value();

  return getRelatedFilms(
    planet?.films,
    films
  );
});
}
