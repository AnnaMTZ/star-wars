import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-a-new-hope',
  imports: [],
  templateUrl: './a-new-hope.html',
  styleUrl: './a-new-hope.scss',
})

export class ANewHope {
  private swapiService = inject(landingService);

  films = rxResource({
    stream: () => this.swapiService.getFilms()
  });

      planets = rxResource({
    stream: () => this.swapiService.getPlanets()
  });}