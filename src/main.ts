import { bootstrapApplication } from '@angular/platform-browser';
import { ScreenMoneyComponent } from '../src/components/screen-money/screen-money.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    appConfig.providers,  // Usa los providers definidos en appConfig
    provideHttpClient(withFetch()),  // Configura HttpClient con fetch
  ],
})
  .catch((err) => console.error(err));
