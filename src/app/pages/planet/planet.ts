import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRequiredRouteParam, getRelatedFilms, toSlug } from '../../shared/utils/route.utils';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './planet.html',
  styleUrls: ['./planet.scss'],
})
export class Planet {
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

  get currentPlanet(): any | null {
    const planets = this.planets.value();

    if (!planets) {
      return null;
    }

    return (
      planets.find((planet: any) => {
        const id = planet.url?.split('/').filter(Boolean).pop();
        return id === this.planetId;
      }) ?? null
    );
  }

get relatedFilms(): any[] {
  return getRelatedFilms(
    this.currentPlanet?.films,
    this.films.value()
  );
}
}