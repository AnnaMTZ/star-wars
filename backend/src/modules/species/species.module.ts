import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

import { SpeciesController } from './species.controller.js';
import { SpeciesService } from './species.service.js';
import { SwapiClient } from '../../clients/swapi.client.js';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService, SwapiClient],
})
export class SpeciesModule {}