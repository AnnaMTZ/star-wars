import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service.js';
import { PersonDto } from './dto/person.dto.js';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  getPeople(): Promise<PersonDto[]> {
    return this.peopleService.getPeople();
  }

  @Get(':id')
  getPerson(@Param('id') id: string): Promise<PersonDto> {
    return this.peopleService.getPerson(id);
  }
}