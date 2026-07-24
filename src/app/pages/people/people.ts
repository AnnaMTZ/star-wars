import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);

  readonly personId =
    this.route.snapshot.paramMap.get('id') ?? '';

  people = rxResource({
    stream: () => this.swapiService.getPeople(),
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