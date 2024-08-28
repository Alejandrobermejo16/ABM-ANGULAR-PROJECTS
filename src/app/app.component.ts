import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    CarouselModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Cambiado de styleUrl a styleUrls
})
export class AppComponent {
  title = 'Cambio-moneda';
  public isSliderVisible: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isSliderVisible = this.router.url === '/';
    });
  }

}
