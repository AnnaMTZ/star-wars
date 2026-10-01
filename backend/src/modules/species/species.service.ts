import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';

@Injectable()
export class SpeciesService {
  constructor(private readonly swapiClient: SwapiClient) {}

  async getSpecies() {
    return this.swapiClient.getSpecies();
  }

  async getSpecie(id: string) {
    return this.swapiClient.getSpecie(id);
  }
}