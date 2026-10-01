import { Controller, Get, Param } from '@nestjs/common';
import { SpeciesService } from './species.service.js';

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  getSpecies() {
    return this.speciesService.getSpecies();
  }

  @Get(':id')
  getSpecie(@Param('id') id: string) {
    return this.speciesService.getSpecie(id);
  }
}