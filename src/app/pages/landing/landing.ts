import { Component, inject } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { landingService } from '../../services/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing {
  private swapiService = inject(landingService);

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });
}
