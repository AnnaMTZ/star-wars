import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service.js';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms() {
    return this.filmsService.getFilms();
  }
}