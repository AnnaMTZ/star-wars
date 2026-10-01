import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SwapiClient {
  constructor(private readonly http: HttpService) {}

  private readonly baseUrl = 'https://swapi.info/api';

  async getPeople() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/people`),
    );

    return data;
  }

  async getPerson(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/people/${id}`),
    );

    return data;
  }

  async getPlanets() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/planets`),
    );

    return data;
  }

  async getPlanet(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/planets/${id}`),
    );

    return data;
  }

  async getFilms() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/films`),
    );

    return data;
  }

  async getFilm(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/films/${id}`),
    );

    return data;
  }

  async getSpecies() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/species`),
    );

    return data;
  }

  async getSpecie(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/species/${id}`),
    );

    return data;
  }

  async getVehicles() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/vehicles`),
    );

    return data;
  }

  async getVehicle(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/vehicles/${id}`),
    );

    return data;
  }

  async getStarships() {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/starships`),
    );

    return data;
  }

  async getStarship(id: string) {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/starships/${id}`),
    );

    return data;
  }
}