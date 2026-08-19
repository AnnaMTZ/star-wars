import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import {
  getRequiredRouteParam, toSlug, getRelatedFilms, extractIdFromUrl
} from '../../core/utils/route.utils';
import { Film, Vehicle } from '../../core/models';

@Component({
  selector: 'app-vehicle',
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  private route = inject(ActivatedRoute);
  private swapiService = inject(SwapiService);
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

readonly currentVehicle = computed(() => {
  const vehicles = this.vehicles.value();

  if (!vehicles) {
    return null;
  }

  return (
    vehicles.find((vehicle: Vehicle) => {
      const id = extractIdFromUrl(vehicle.url);
      return id === this.vehicleId;
    }) ?? null
  );
});

readonly relatedFilms = computed(() => {
  const vehicle = this.currentVehicle();
  const films = this.films.value();

  return getRelatedFilms(
    vehicle?.films,
    films
  );
});
}
