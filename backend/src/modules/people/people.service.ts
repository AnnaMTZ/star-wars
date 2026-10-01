import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';
import { PersonDto } from './dto/person.dto.js';
import { SwapiPerson } from './interfaces/swapi-person.interface.js';

@Injectable()
export class PeopleService {
  constructor(
    private readonly swapiClient: SwapiClient,
  ) {}

  async getPeople(): Promise<PersonDto[]> {
    const people = await this.swapiClient.getPeople();

    return people.map((person: SwapiPerson) => this.toDto(person));
  }

  async getPerson(id: string): Promise<PersonDto> {
    const person = await this.swapiClient.getPerson(id);

    return this.toDto(person);
  }

 private toDto(person: SwapiPerson): PersonDto {
  return {
    id: this.extractId(person.url),
    name: person.name,
    birthYear: person.birth_year,
    eyeColor: person.eye_color,
    gender: person.gender,
    hairColor: person.hair_color,
    height: person.height,
    mass: person.mass,
    skinColor: person.skin_color,
    homeworld: person.homeworld,
    films: person.films, 
    url: person.url,
  };
}

  private extractId(url: string): string {
    const matches = url.match(/\/(\d+)\/?$/);

    return matches?.[1] ?? '';
  }
}