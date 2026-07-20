import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-episode',
  standalone: true,
  imports: [],
  templateUrl: './episode.html',
  styleUrl: './episode.scss',
})
export class Episode {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);

  episodeName =
    this.route.snapshot.paramMap.get('movie')?.toLowerCase() ?? '';

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });
}