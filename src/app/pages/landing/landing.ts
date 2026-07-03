import { Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { landingService } from '../../services/landing.service';


@Component({
  selector: 'app-landing',
  template: `
    @if (people.isLoading()) {
      <p>Loading...</p>
    }

  @for (person of people.value() ?? []; track person.name) {
      <p>{{ person.name }}</p>
    }
  `
})
export class Landing {
  private swapiService = inject(landingService);

  people = rxResource({
    stream: () => this.swapiService.getPeople()
  });
}
