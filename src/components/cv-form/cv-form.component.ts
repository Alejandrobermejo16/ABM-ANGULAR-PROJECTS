import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para redirección
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { APP_CONSTANTS } from '../../app/constants/constants';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



interface Question {
  label: string;
  placeholder: string;
  id: string;
  description?: boolean; 
}

interface TitleQuestion {
  title: string;
}

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, PaginationModule, FormsModule, NgxSpinnerModule],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CvFormComponent {
  userResponses: { [questionId: string]: string } = {};
  currentPage = 1;
  totalItems = APP_CONSTANTS.QUESTIONS.length;
  title_questions: TitleQuestion[] = APP_CONSTANTS.TITLE_QUESTIONS;

  questionsToShow: Question[] = [];
  currentTitle: TitleQuestion | null = null;

  // Inyecta el Router y NgxSpinnerService en el constructor para poder usar los metodos que tienen
  constructor(private router: Router, private spinner: NgxSpinnerService) {}

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
      this.questionsToShow = APP_CONSTANTS.QUESTIONS[index];
      this.currentTitle = this.title_questions[index] || null;
    } else {
      this.questionsToShow = [];
      this.currentTitle = null;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.title_questions.length) {
        this.currentPage += 1;
        this.updateContentToShow();
    } else {
        this.spinner.show(); // Mostrar spinner

        // Esperar un momento para mostrar el spinner antes de redirigir
        setTimeout(() => {
            this.spinner.hide();
            this.router.navigate(['/ResumeDesignerComponent']); // Redirigir después de 3 segundos
        }, 3000); // Ajusta el tiempo si es necesario
    }
}


  onOptionSelected(questionId: string, selectedValue: string): void {
    this.userResponses[questionId] = selectedValue;
    console.log('Respuestas del usuario:', this.userResponses);
    this.goToNextPage();
  }
}
