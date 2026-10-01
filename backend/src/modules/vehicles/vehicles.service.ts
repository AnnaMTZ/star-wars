import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';

@Injectable()
export class VehiclesService {
  constructor(private readonly swapiClient: SwapiClient) {}

  async getVehicles() {
    console.log('first swapi vehicle');
    return this.swapiClient.getVehicles();
  }

  async getVehicle(id: string) {
    return this.swapiClient.getVehicle(id);
  }
}
