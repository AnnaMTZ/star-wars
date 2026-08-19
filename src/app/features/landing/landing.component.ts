import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import { catchError, throwError } from 'rxjs';
import { toSlug } from '../../core/utils/route.utils';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  private swapiService = inject(SwapiService);
   readonly toSlug = toSlug;

readonly films = rxResource({
  stream: () =>
    this.swapiService.getFilms().pipe(
      catchError(error => {
        console.error('Failed to load films', error);
        return throwError(() => error);
      })
    ),
});
}