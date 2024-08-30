import { Component } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import {APP_CONSTANTS} from '../../app/constants/constants';

interface Question {
  label: string;
  placeholder: string;
  id: string;
}

interface TitleQuestion {
  title: string;
}

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
  currentPage = 1;
  totalItems = 30; // Esto debería ser el número total de preguntas que estás manejando
  title_questions: TitleQuestion[] = [
    { title: "¿Cuánta experiencia laboral tienes?" },
    { title: "¿Estás estudiando?" },
    // Agrega más títulos según el número de grupos de preguntas que tengas
  ];

  

  questionsToShow: Question[] = [];
  currentTitle: TitleQuestion | null = null;

  ngOnInit() {
    this.updateContentToShow();
  }

  onPageChanged(event: any): void {
    this.currentPage = event.page;
    this.updateContentToShow();
  }

  updateContentToShow(): void {
    const index = this.currentPage - 1; // Restar 1 para ajustar el índice basado en 0
    if (index >= 0 && index < APP_CONSTANTS.QUESTIONS.length) {
      this.questionsToShow = APP_CONSTANTS.QUESTIONS[index]; // Mostrar preguntas del grupo correspondiente
      this.currentTitle = this.title_questions[index] || null; // Mostrar título correspondiente
    } else {
      this.questionsToShow = []; // No mostrar preguntas si la página no está en el rango
      this.currentTitle = null; // No mostrar título si la página no está en el rango
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.title_questions.length) {
      this.currentPage += 1;
      this.updateContentToShow();
    }
  }
}

