import { Injectable, Injector, ApplicationRef, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PantheonLoaderService {
  constructor(
    private injector: Injector,
    private appRef: ApplicationRef,
    private ngZone: NgZone
  ) {
    this.initPantheonModules();
  }

  private initPantheonModules() {
    this.ngZone.runOutsideAngular(() => {
      try {
        // Intentar cargar los módulos de Pantheon de forma dinámica
        import('pantheon-ui').then((module) => {
          console.log('Pantheon-ui modules loaded:', module);
          // Esperar un tick para que los módulos se registren
          setTimeout(() => {
            this.appRef.tick();
          }, 100);
        }).catch(err => {
          console.warn('Could not load pantheon-ui modules dynamically:', err);
        });
      } catch (error) {
        console.warn('Error initializing Pantheon modules:', error);
      }
    });
  }
}
