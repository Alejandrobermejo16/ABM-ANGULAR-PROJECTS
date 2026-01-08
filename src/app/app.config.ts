import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PantheonRestService } from '@pantheon/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(),
    PantheonRestService
  ]
}