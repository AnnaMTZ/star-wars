import { Controller, Get, Param } from '@nestjs/common';
import { StarshipsService } from './starships.service.js';

@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  getStarships() {
    return this.starshipsService.getStarships();
  }

  @Get(':id')
  getStarship(@Param('id') id: string) {
    return this.starshipsService.getStarship(id);
  }
}