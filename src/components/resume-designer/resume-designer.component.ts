import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { register as registerSwiperElements} from 'swiper/element/bundle';


@Component({
  selector: 'app-resume-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, MatButtonModule, MatMenuModule],
  templateUrl: './resume-designer.component.html',
  styleUrl: './resume-designer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ResumeDesignerComponent implements OnInit  {
  prop1: string = '';
  prop2: boolean = true;
  slides = [
    { image: '/CambioMoneda.jpg', caption: 'First slide' },
    { image: '/CambioMoneda.jpg', caption: 'Second slide' },
    { image: '/CambioMoneda.jpg', caption: 'Third slide' }
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor() {
    registerSwiperElements();
  }
}
