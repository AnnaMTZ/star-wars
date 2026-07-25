import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicle.html',
  styleUrls: ['./vehicle.scss'],
})
export class Vehicle {
  private route = inject(ActivatedRoute);
  private swapiService = inject(landingService);

  readonly vehicleId =
    this.route.snapshot.paramMap.get('id') ?? '';

  vehicles = rxResource({
    stream: () => this.swapiService.getVehicles(),
  });

  films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  get currentVehicle(): any | null {
    const vehicles = this.vehicles.value();

    if (!vehicles) {
      return null;
    }

    return (
      vehicles.find((vehicle: any) => {
        const id = vehicle.url?.split('/').filter(Boolean).pop();
        return id === this.vehicleId;
      }) ?? null
    );
  }
}