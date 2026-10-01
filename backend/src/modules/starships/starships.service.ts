import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';

@Injectable()
export class StarshipsService {
  constructor(private readonly swapiClient: SwapiClient) {}

  async getStarships() {
    return this.swapiClient.getStarships();
  }

  async getStarship(id: string) {
    return this.swapiClient.getStarship(id);
  }
}