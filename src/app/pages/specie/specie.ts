import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-specie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './specie.html',
  styleUrls: ['./specie.scss'],
})
export class Specie {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);

  readonly specieId =
    this.route.snapshot.paramMap.get('id') ?? '';

  species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  get currentSpecie(): any | null {
    const species = this.species.value();

    if (!species) {
      return null;
    }

    return (
      species.find((specie: any) => {
        const id = specie.url?.split('/').filter(Boolean).pop();
        return id === this.specieId;
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