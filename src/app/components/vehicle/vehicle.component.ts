import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import {
  getRequiredRouteParam, toSlug, getRelatedFilms, extractIdFromUrl
} from '../../core/utils/route.utils';
import { Film, Vehicle } from '../../core/models';

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
      (vehicle: Vehicle) => {
             const id =  extractIdFromUrl(vehicle.url);
        return id === this.vehicleId;
      }
     
    ) ?? null
  );
}

  get relatedFilms(): Film[] {
  return getRelatedFilms(
    this.currentVehicle?.films,
    this.films.value()
  );
}
}
