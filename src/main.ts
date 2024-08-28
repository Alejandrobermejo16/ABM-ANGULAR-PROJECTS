import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,  // Usa los providers definidos en appConfig
    provideHttpClient(withFetch()), provideAnimationsAsync(),  // Configura HttpClient con fetch
  ],
})
  .catch((err) => console.error(err));
