import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

import { PlanetsController } from './planets.controller.js';
import { PlanetsService } from './planets.service.js';
import { SwapiClient } from '../../clients/swapi.client.js';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService, SwapiClient],
})
export class PlanetsModule {}