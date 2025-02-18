import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cv-type',
  standalone: true,
  imports: [CommonModule,ProgressbarModule,FormsModule],
  templateUrl: './cv-type.html',
  styleUrl: './cv-type.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CvTypeComponent implements OnInit  {
  

  ngOnInit(): void {
  }

  constructor() {
  }
}
