import { Controller, Get, Param } from '@nestjs/common';
import { PlanetsService } from './planets.service.js';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  getPlanets() {
    return this.planetsService.getPlanets();
  }

  @Get(':id')
  getPlanet(@Param('id') id: string) {
    return this.planetsService.getPlanet(id);
  }
}