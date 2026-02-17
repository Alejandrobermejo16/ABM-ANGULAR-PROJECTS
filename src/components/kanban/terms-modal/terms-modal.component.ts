import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-terms-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss']
})
export class TermsModalComponent {
  @Input() show: boolean = false;
  @Input() type: 'terms' | 'privacy' = 'terms';
  @Output() showChange = new EventEmitter<boolean>();

  close() {
    this.show = false;
    this.showChange.emit(false);
  }
}
