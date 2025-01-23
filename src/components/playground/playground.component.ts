import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-playground-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  
})
export class Playground implements OnInit {
  valueName: string | undefined;
  holder: string | undefined;
  disabled: boolean = false;

  ngOnInit() {
    this.holder = 'escribe en el siguiente input'
  }

  changeName(name: any) {
    let newValue = 'nombre de pega';
    this.valueName = newValue;
    this.disabled = true;
  }
}