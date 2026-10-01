import { Module } from '@nestjs/common';
import { PeopleModule } from './modules/people/people.module.js';
import { VehiclesModule } from './modules/vehicles/vehicles.module.js';
import { StarshipsModule } from './modules/starships/starships.module.js';
import { SpeciesModule } from './modules/species/species.module.js';
import { FilmsModule } from './modules/films/films.module.js';
import { PlanetsModule } from './modules/planets/planets.module.js';
import { AppController } from './app.controller.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [
    PeopleModule,
    PlanetsModule,
    FilmsModule,
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}