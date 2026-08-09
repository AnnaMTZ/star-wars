import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRelatedFilms, getRequiredRouteParam, toSlug } from '../../core/utils/route.utils';
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
// const id = extractIdFromUrl(film.url);

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
        const id = starship.url?.split('/').filter(Boolean).pop();
        return id === this.starshipId;
      }) ?? null
    );
  }

  /// reuse the utility function to extract the ID from the URL
  getFilmId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

get relatedFilms(): Film[] {
  return getRelatedFilms(
    this.currentStarship?.films,
    this.films.value()
  );
}
}



