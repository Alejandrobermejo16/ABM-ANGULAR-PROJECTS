import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-info-angular-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info-angular.component.html',
  styleUrls: ['./info-angular.component.css'],
  
})
export class InfoAngular implements OnInit {
  valueName: string | undefined;
  holder: string | undefined;
  disabled: boolean = false;
  activeButton: boolean = false;

  ngOnInit() {
    this.holder = 'escribe en el siguiente input'
  }

  changeName(name: any) {
    this.disabled = true;
    this.activeButton = true;
  }
  activeButtonEvent(){
    this.activeButton = false;
    this.disabled = false;
  }
}