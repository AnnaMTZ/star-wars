import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { SwapiService } from '../../core/services/swapi.service';
import { extractIdFromUrl, getRequiredRouteParam, toSlug  } from '../../core/utils/route.utils';
import { Planet, Film, Person, Specie, Vehicle, Starship } from '../../core/models';

@Component({
  selector: 'app-person',
  imports: [CommonModule, RouterLink],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  private swapiService = inject(SwapiService);
  private route = inject(ActivatedRoute);
 readonly toSlug = toSlug;
  readonly personId = getRequiredRouteParam(this.route, 'id');
  readonly getId = extractIdFromUrl;


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
      people.find((person: Person) => {
        const id = person.url?.split('/').filter(Boolean).pop();
        return id === this.personId;
      }) ?? null
    );
  });

readonly homeworld = computed<Planet | null>(() => {
  const person = this.currentPerson();
  const planets = this.planets.value();

  if (!person?.homeworld || !planets) {
    return null;
  }

  return (
    planets?.find(
      (planet: Planet) => planet.url === person.homeworld
    ) ?? null
  );
});

  readonly personSpecies = computed(() => {
    const person = this.currentPerson();

    if (!person?.species?.length) return [];

    return (
      this.species
        .value()
        ?.filter((specie: Specie) => person.species.includes(specie.url)) ?? []
    );
  });

  readonly personVehicles = computed(() => {
    const person = this.currentPerson();

    if (!person?.vehicles?.length) return [];

    return (
      this.vehicles
        .value()
        ?.filter((vehicle: Vehicle) => person.vehicles.includes(vehicle.url)) ?? []
    );
  });

  readonly personStarships = computed(() => {
    const person = this.currentPerson();

    if (!person?.starships?.length) return [];

    return (
      this.starships
        .value()
        ?.filter((starship: Starship) =>
          person.starships.includes(starship.url)
        ) ?? []
    );
  });

  /// to check if I can use relatedFilms
  readonly personFilms = computed(() => {
    const person = this.currentPerson();

    if (!person?.films?.length) return [];

    return (
      this.films
        .value()
        ?.filter((film: Film) => person.films.includes(film.url)) ?? []
    );
  });

}