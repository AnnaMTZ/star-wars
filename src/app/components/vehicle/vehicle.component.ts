import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import {
  getRequiredRouteParam, toSlug, getRelatedFilms, extractIdFromUrl
} from '../../core/utils/route.utils';
import { Planet, Film, Person, Specie, Vehicle, Starship } from '../../core/models';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);
  readonly toSlug = toSlug;

readonly vehicleId = getRequiredRouteParam(
  this.route,
  'id'
);


  vehicles = rxResource({
    stream: () => this.swapiService.getVehicles(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

get currentVehicle(): Vehicle | null {
  const vehicles = this.vehicles.value();

  if (!vehicles) {
    return null;
  }

  return (
    vehicles.find(
      (vehicle: Vehicle) =>
        extractIdFromUrl(vehicle.url) === this.vehicleId
    ) ?? null
  );
}

  get relatedFilms(): Film[] {
  const vehicle = this.currentVehicle;
  const films = this.films.value();

  if (!vehicle?.films?.length || !films) {
    return [];
  }

  return films.filter((film: Film) =>
    vehicle.films.includes(film.url)
  );
}
}