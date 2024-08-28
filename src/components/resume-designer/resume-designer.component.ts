import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@Component({
  selector: 'app-resume-designer',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, MatButtonModule, MatMenuModule],
  templateUrl: './resume-designer.component.html',
  styleUrl: './resume-designer.component.css'
})
export class ResumeDesignerComponent implements OnInit  {
  
  prop1: string = '';
  prop2: boolean = true;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor() {}
  




}
