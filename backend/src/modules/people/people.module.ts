import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import * as https from 'https';

import { PeopleController } from './people.controller.js';
import { PeopleService } from './people.service.js';
import { SwapiClient } from '../../clients/swapi.client.js';

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, SwapiClient],
})
export class PeopleModule {}
