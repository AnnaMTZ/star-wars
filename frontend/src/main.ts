import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';

import { keycloak } from './app/core/services/keycloak.service';

keycloak
  .init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    checkLoginIframe: false
  })
  .then(() => {
    return bootstrapApplication(
      App,
      appConfig
    );
  })
  .catch((err) => {
    console.error(err);
  });