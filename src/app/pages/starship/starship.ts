import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { getRelatedFilms, getRequiredRouteParam, toSlug } from '../../shared/utils/route.utils';


@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './starship.html',
  styleUrls: ['./starship.scss'],
})
export class Starship {
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

  get currentStarship(): any | null {
    const starships = this.starships.value();

    if (!starships) {
      return null;
    }

    return (
      starships.find((starship: any) => {
        const id = starship.url?.split('/').filter(Boolean).pop();
        return id === this.starshipId;
      }) ?? null
    );
  }


  /// reuse the utility function to extract the ID from the URL
  getFilmId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

get relatedFilms(): any[] {
  return getRelatedFilms(
    this.currentStarship?.films,
    this.films.value()
  );
}
}



