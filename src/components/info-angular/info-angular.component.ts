import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IMAGES_PATH } from './constants';

@Component({
  selector: 'app-info-angular-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info-angular.component.html',
  styleUrls: ['./info-angular.component.css'],
})
export class InfoAngular implements OnInit {
  ArrayImages: Array<{ title: string, path: string }> = [];
  image: string = '';
  dinamicTitle: string | undefined;
  page!: number;
  totalPages!: number;

  ngOnInit() {
    this.ArrayImages = IMAGES_PATH;
    if (this.ArrayImages.length > 0) {
      this.image = this.ArrayImages[0].path;
      this.dinamicTitle = this.ArrayImages[0].title;
      this.page = 0;
      this. totalPages = this.ArrayImages.length -1;
    }
  }

  changeImage(direction: number) {
    const currentIndex = this.ArrayImages.findIndex((img) => img.path === this.image);
    let newIndex = (currentIndex + direction + this.ArrayImages.length) % this.ArrayImages.length;
    this.page = newIndex;
    this.image = this.ArrayImages[newIndex].path;
    let newTitle = this.ArrayImages[newIndex].title;
    this.dinamicTitle = newTitle;
  }
}
