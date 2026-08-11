import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { extractIdFromUrl, getRelatedFilms, getRequiredRouteParam, toSlug } from '../../core/utils/route.utils';
import { Film, Starship } from '../../core/models';


@Component({
  selector: 'app-starship', 
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);
  readonly toSlug = toSlug;

readonly starshipId = getRequiredRouteParam(this.route, 'id');

  starships = rxResource({
    stream: () => this.swapiService.getStarships(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  get currentStarship(): Starship | null {
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
  }

get relatedFilms(): Film[] {
  return getRelatedFilms(
    this.currentStarship?.films,
    this.films.value()
  );
}
}



