import { Component } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule


@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
  currentPage = 1;
  totalItems = 30;

  questions = [
    { label: 'Introduce tu nombre completo', placeholder: 'Introduce tu nombre completo', id: 'nombre' },
    { label: 'Introduce tu fecha de nacimiento', placeholder: 'Introduce tu fecha de nacimiento', id: 'fecha' },
    { label: 'Introduce tu formación académica', placeholder: 'Introduce tu formación académica', id: 'formacion' },
    { label: 'Introduce tu experiencia laboral', placeholder: 'Introduce tu experiencia laboral', id: 'experiencia' }
  ];

  formationOptions = [
    { value: 'desarrollador', label: 'Desarrollador' },
    { value: 'diseñador', label: 'Diseñador' },
    // Agrega más opciones según sea necesario
  ];

  experienceOptions = [
    { value: 'junior', label: 'Junior' },
    { value: 'senior', label: 'Senior' },
    // Agrega más opciones según sea necesario
  ];

  selectedFormation: string | undefined;
  selectedExperience: string | undefined;

  onSubmit(): void {
    console.log('Formulario enviado');
    this.goToNextPage();
  }

  goToNextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / 10)) {
      this.currentPage++;
      console.log(`Navegando a la página ${this.currentPage}`);
    }
  }

  onPageChanged(event: any): void {
    this.currentPage = event.page;
    console.log(`Página actual cambiada a ${this.currentPage}`);
  }

  onFormationChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedFormation = selectElement.value;
    console.log(`Formación seleccionada: ${this.selectedFormation}`);
  }

  onExperienceChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedExperience = selectElement.value;
    console.log(`Experiencia seleccionada: ${this.selectedExperience}`);
  }
}
