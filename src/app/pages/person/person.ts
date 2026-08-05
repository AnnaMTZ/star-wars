import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './person.html',
  styleUrl: './person.scss',
})
export class Person {
  private swapiService = inject(landingService);
  private route = inject(ActivatedRoute);

  //is used in every component, move to one place and reuse
  readonly personId = this.route.snapshot.paramMap.get('id') ?? '';

  readonly people = rxResource({
    stream: () => this.swapiService.getPeople(),
  });

  readonly films = rxResource({
    stream: () => this.swapiService.getFilms(),
  });

  readonly planets = rxResource({
    stream: () => this.swapiService.getPlanets(),
  });

  readonly species = rxResource({
    stream: () => this.swapiService.getSpecies(),
  });

  readonly vehicles = rxResource({
    stream: () => this.swapiService.getVehicles(),
  });

  readonly starships = rxResource({
    stream: () => this.swapiService.getStarships(),
  });

  readonly currentPerson = computed(() => {
    const people = this.people.value();

    if (!Array.isArray(people)) {
      return null;
    }

    return (
      people.find((person: any) => {
        const id = person.url?.split('/').filter(Boolean).pop();
        return id === this.personId;
      }) ?? null
    );
  });

  readonly homeworld = computed(() => {
    const person = this.currentPerson();

    if (!person?.homeworld) return null;

    return (
      this.planets
        .value()
        ?.find((planet: any) => planet.url === person.homeworld) ?? null
    );
  });

  readonly personSpecies = computed(() => {
    const person = this.currentPerson();

    if (!person?.species?.length) return [];

    return (
      this.species
        .value()
        ?.filter((specie: any) => person.species.includes(specie.url)) ?? []
    );
  });

  readonly personVehicles = computed(() => {
    const person = this.currentPerson();

    if (!person?.vehicles?.length) return [];

    return (
      this.vehicles
        .value()
        ?.filter((vehicle: any) => person.vehicles.includes(vehicle.url)) ?? []
    );
  });

  readonly personStarships = computed(() => {
    const person = this.currentPerson();

    if (!person?.starships?.length) return [];

    return (
      this.starships
        .value()
        ?.filter((starship: any) =>
          person.starships.includes(starship.url)
        ) ?? []
    );
  });

  readonly personFilms = computed(() => {
    const person = this.currentPerson();

    if (!person?.films?.length) return [];

    return (
      this.films
        .value()
        ?.filter((film: any) => person.films.includes(film.url)) ?? []
    );
  });

  getId(url: string): string {
    return url.split('/').filter(Boolean).pop() ?? '';
  }

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }
}