import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

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

  readonly starshipId =
    this.route.snapshot.paramMap.get('id') ?? '';

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

toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

  getFilmId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }
}