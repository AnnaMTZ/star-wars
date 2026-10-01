import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

import { FilmsController } from './films.controller.js';
import { FilmsService } from './films.service.js';
import { SwapiClient } from '../../clients/swapi.client.js';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, SwapiClient],
})
export class FilmsModule {}