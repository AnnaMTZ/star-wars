import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { catchError, throwError } from 'rxjs';
import { toSlug } from '../../core/utils/route.utils';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  private swapiService = inject(landingService);
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