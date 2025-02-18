import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
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
  @Input() name: string = '';
  @Input() telephone: string = '';
  @Input() email: string = '';
  @Input() linkedin: string = '';
  @Input() fields: Array<string> | undefined;
  editField(){
    console.log('editField');
  }

  ngOnInit(): void {

  }

  constructor() {
  }
}
