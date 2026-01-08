import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pantheon-grid-panel',
  template: `<pantehon-grid-panel 
    [dataColumns]="dataColumns" 
    [itemTemplate]="itemTemplate"
    [gridTemplateColumns]="gridTemplateColumns"
    (taskMoved)="taskMoved.emit($event)">
  </pantehon-grid-panel>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppPantheonGridPanelComponent {
  @Input() dataColumns: any;
  @Input() itemTemplate: any;
  @Input() gridTemplateColumns: string = 'repeat(4, 1fr)';
  @Output() taskMoved = new EventEmitter();
}

@Component({
  selector: 'app-pantheon-grid-panel-header',
  template: `<pantehon-grid-panel-header 
    [columns]="columns" 
    [menuAux]="menuAux"
    [iconMenu]="iconMenu"
    (extraMenuClick)="extraMenuClick.emit()">
  </pantehon-grid-panel-header>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppPantheonGridPanelHeaderComponent {
  @Input() columns: any;
  @Input() menuAux: boolean = false;
  @Input() iconMenu: string = 'menu';
  @Output() extraMenuClick = new EventEmitter();
}

@Component({
  selector: 'app-pantheon-card',
  template: `<pantehon-card 
    [data]="data" 
    [isCompleted]="isCompleted">
  </pantehon-card>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppPantheonCardComponent {
  @Input() data: any;
  @Input() isCompleted: boolean = false;
}

@Component({
  selector: 'app-pantheon-window',
  template: `<pantehon-window 
    [(show)]="show" 
    [titleBtnClose]="titleBtnClose"
    [titleBtnNext]="titleBtnNext"
    [variant]="variant"
    [size]="size"
    [onAction]="onAction"
    (showChange)="showChange.emit($event)">
    <ng-content></ng-content>
  </pantehon-window>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppPantheonWindowComponent {
  @Input() show: boolean = false;
  @Input() titleBtnClose: string = 'Cerrar';
  @Input() titleBtnNext: string = '';
  @Input() variant: string = 'default';
  @Input() size: string = 'md';
  @Input() onAction: () => void = () => {};
  @Output() showChange = new EventEmitter<boolean>();
}

@Component({
  selector: 'app-pantheon-side-action-panel',
  template: `<pantheon-side-action-panel 
    [open]="open" 
    [actions]="actions"
    (close)="close.emit()">
  </pantheon-side-action-panel>`,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class AppPantheonSideActionPanelComponent {
  @Input() open: boolean = false;
  @Input() actions: any[] = [];
  @Output() close = new EventEmitter();
}
