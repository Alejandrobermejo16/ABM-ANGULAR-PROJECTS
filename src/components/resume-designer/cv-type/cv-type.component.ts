import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cv-type',
  standalone: true,
  imports: [CommonModule, ProgressbarModule, FormsModule],
  templateUrl: './cv-type.html',
  styleUrls: ['./cv-type.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CvTypeComponent implements OnInit {
  @Input() name: string = '';
  @Input() telephone: string = '';
  @Input() email: string = '';
  @Input() linkedin: string = '';
  @Input() fields: object = {};
  imgUpload: string = '';
  
  editField() {
    console.log('editField');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; 
    if (file) {
      const reader = new FileReader(); 
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgUpload = reader.result as string;
      };
    }
  }

  ngOnInit(): void {
    // Puedes inicializar valores aquí si es necesario
  }

  constructor() {}
}
