import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';
import { PlanetDto } from './dto/planet.dto.js';
import { SwapiPlanet } from './interfaces/swapi-planet.interface.js';

@Injectable()
export class PlanetsService {
  constructor(private readonly swapiClient: SwapiClient) {}

  async getPlanets(): Promise<PlanetDto[]> {
    const planets = await this.swapiClient.getPlanets();

    return planets.map((planet: SwapiPlanet) => this.mapPlanet(planet));
  }

  async getPlanet(id: string): Promise<PlanetDto> {
    const planet = await this.swapiClient.getPlanets();


    return this.mapPlanet(planet);
  }

  private mapPlanet(planet: SwapiPlanet): PlanetDto {
    return {
      id: this.extractId(planet.url),
      name: planet.name,

      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      diameter: planet.diameter,

      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,

      population: planet.population,

      residents: planet.residents,
      films: planet.films,

      url: planet.url,
    };
  }

  private extractId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }
}