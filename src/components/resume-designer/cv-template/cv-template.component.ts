import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
import { CvTypeComponent } from '../cv-type/cv-type.component';
@Component({
  selector: 'app-cv-template',
  standalone: true,
  imports: [CommonModule,ProgressbarModule,FormsModule,CvTypeComponent],
  templateUrl: './cv-template.html',
  styleUrl: './cv-template.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CvTemplateComponent implements OnInit  {
  fields: Array<string> | undefined;
  value: number = 0;
  labelSubmit: string = 'Siguiente';

  onProgressChange(value:number){
    this.value += 20;
    if(this.value > 100){
      this.value = 0;
      this.labelSubmit = 'Enviar';
    }
    return this.value;
  }

  ngOnInit(): void {
  }

  constructor() {
    this.fields = ['Personal', 'Educación', 'Experiencia', 'Habilidades', 'Idiomas'];
    this.value = this.fields ?  1 * 100 / this.fields.length : 0;
    console.log(this.value);
  }
}
