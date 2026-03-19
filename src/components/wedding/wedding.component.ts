import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingLandingComponent } from './wedding-landing/wedding-landing.component';

@Component({
  selector: 'app-wedding',
  standalone: true,
  imports: [CommonModule, WeddingLandingComponent],
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.css']
})
export class WeddingComponent {
  secciones = [
    { titulo: 'Bienvenidos', componente: WeddingLandingComponent },
    { titulo: 'La Ceremonia', contenido: 'Detalles del lugar y la hora.' },
    { titulo: 'Banquete', contenido: 'Menú y sorpresas para los invitados.' },
    { titulo: 'Confirmación', contenido: 'Por favor, haznos saber si vienes.' }
  ];
  

}
