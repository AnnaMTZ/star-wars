import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { RouterLink } from '@angular/router';

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

  readonly planetId =
    this.route.snapshot.paramMap.get('id') ?? '';

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

films = rxResource({
  stream: () => this.swapiService.getFilms(),
});

toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

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
}