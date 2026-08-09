import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRequiredRouteParam, getRelatedFilms, toSlug } from '../../core/utils/route.utils';
import { Planet, Film } from '../../core/models';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss'],
})
export class PlanetComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);
  readonly planetId = getRequiredRouteParam(this.route, 'id');
  readonly toSlug = toSlug;

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  get currentPlanet(): Planet | null {
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
  }

get relatedFilms(): Film[] {
  return getRelatedFilms(
    this.currentPlanet?.films,
    this.films.value()
  );
}
}