import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { rxResource } from '@angular/core/rxjs-interop';

import { landingService } from '../../services/landing.service/landing.service';
import { Game } from '../../features/game/game';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, Game],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing {
  private swapiService = inject(landingService);

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });
}
