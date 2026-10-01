import { Injectable } from '@nestjs/common';
import { SwapiClient } from '../../clients/swapi.client.js';
import { FilmDto } from './dto/film.dto.js';
import { SwapiFilm } from './interfaces/swapi-film.interface.js';

@Injectable()
export class FilmsService {
  constructor(
    private readonly swapiClient: SwapiClient,
  ) {}

  async getFilms(): Promise<FilmDto[]> {
    try {
      const films: SwapiFilm[] = await this.swapiClient.getFilms();

      console.log('SUCCESS', films.length);

      return films.map((film: SwapiFilm) => ({
        id: film.url.split('/').filter(Boolean).pop() ?? '',
        url: film.url,
        title: film.title,
        episodeId: film.episode_id,
        openingCrawl: film.opening_crawl,
        producer: film.producer,
        director: film.director,
        releaseDate: film.release_date,
        characters: film.characters,
        planets: film.planets,
        species: film.species,
        vehicles: film.vehicles,
        starships: film.starships,
      }));
    } catch (error) {
      console.error('FILMS ERROR', error);
      throw error;
    }
  }
}