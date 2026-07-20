import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-episode',
  imports: [],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})

export class ANewHope {
  private swapiService = inject(landingService);

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });

      planets = rxResource({
    stream: () => this.swapiService.getPlanets()
  });}