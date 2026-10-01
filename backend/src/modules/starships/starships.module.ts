import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

import { StarshipsController } from './starships.controller.js';
import { StarshipsService } from './starships.service.js';
import { SwapiClient } from '../../clients/swapi.client.js';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [StarshipsController],
  providers: [StarshipsService, SwapiClient],
})
export class StarshipsModule {}