import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);

  readonly personId =
    this.route.snapshot.paramMap.get('id') ?? '';

  people = rxResource({
    stream: () => this.swapiService.getPeople(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

  species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  vehicles = rxResource({
    stream: () => this.swapiService.getVehicles(),
  });

  starships = rxResource({
    stream: () => this.swapiService.getStarships(),
  });

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }

getId(url: string): string {
  return url.split('/').pop() ?? '';
}

  get currentPerson(): any | null {
    const people = this.people.value();

    if (!people) {
      return null;
    }

    return (
      people.find((person: any) => {
        const id = person.url?.split('/').filter(Boolean).pop();
        return id === this.personId;
      }) ?? null
    );
  }
}