import { Component, PLATFORM_ID, Inject, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GridPanelModule, GridPanelHeaderModule, CardModule, WindowModule, SideActionPanelModule } from 'pantheon-libraries';
import { PantheonBaseComponent, PantheonRestService } from 'pantheon-libraries/core';
import { InitialLoginComponent } from './initial-login/initial-login.component';

export interface Action {
  label: string;
  icon?: string;
  type?: 'default' | 'danger' | 'primary';
  callback: () => void;
}

export interface TaskInterface {
  _id?: string;
  title: string;
  description: string;
  status: string;
  userEmail?: string;
}

declare const google: any;

const STATUS_MAP: Record<string, string> = {
  'ready to start': 'Ready To Start',
  'in progress': 'In Progress',
  'ready to verify/deploy': 'Ready to verify/Deploy',
  'deployed': 'Deployed'
};

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    GridPanelModule,
    GridPanelHeaderModule,
    CardModule,
    WindowModule,
    SideActionPanelModule,
    InitialLoginComponent
  ]
})
export class KanbanComponent extends PantheonBaseComponent {
  
  title = 'kanban-board';
  showModal = false;
  selectedTask: TaskInterface | null = null;
  columns: Array<string> = ['Ready To Start', 'In Progress', 'Ready to verify/Deploy', 'Deployed'];
  dataColumns: Array<{ name: string; items: TaskInterface[] }> = [];
  isMenuOpen = false;
  createTaskWindow = false;
  taskTitle = '';
  taskDescription = '';
  userEmail = '';
  isLoggedIn = false;
  private isBrowser = false;

  fieldActions: Action[] = [
    { label: 'Añadir tarea', icon: '➕', type: 'primary', callback: () => this.openCreateModal() },
    { label: 'Editar', icon: '✏️', type: 'default', callback: () => console.log('Editar acción') },
    { label: 'Eliminar', icon: '🗑', type: 'danger', callback: () => console.log('Eliminar acción') }
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private restService: PantheonRestService
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
    this.dataColumns = this.columns.map(name => ({ name, items: [] }));
  }

  ngOnInit(): void {
    this.loadUserFromSession();
    if (this.userEmail) {
      this.isLoggedIn = true;
      super.ngOnInit();
    }
  }

  private loadUserFromSession() {
    const email = sessionStorage.getItem('userEmail');
    if (email) this.userEmail = email;
  }

  onLoginSuccess(userData: any) {
    this.userEmail = userData.email;
    this.isLoggedIn = true;
    super.ngOnInit();
  }

  protected getModule(): string { return 'getTasks'; }
  protected getResource(): string { return ''; }
  protected getRequestMethod(): string { return 'GET'; }
  protected getDefaultBody(): any { return { userEmail: this.userEmail }; }

  protected dataAfterRequest(data: any): void {
    if (data?.tasks) {
      const columnsMap: Record<string, TaskInterface[]> = {
        'Ready To Start': [],
        'In Progress': [],
        'Ready to verify/Deploy': [],
        'Deployed': []
      };
      data.tasks.forEach((task: TaskInterface) => {
        const statusKey = task.status?.toLowerCase();
        const columnName = STATUS_MAP[statusKey];
        if (columnName) columnsMap[columnName].push(task);
      });
      this.dataColumns = Object.keys(columnsMap).map(key => ({ name: key, items: columnsMap[key] }));
    }
  }

  protected onTaskMoved(event: any) {
    const newStatus = this.columns[event.toIndex];
    this.restService.patch('updateTaskStatus', {
      taskId: event.task._id,
      status: newStatus
    })
      .then(() => console.log('Tarea actualizada'))
      .catch((err: any) => console.error('Error actualizando tarea:', err));
  }

  private openCreateModal() { 
    this.isMenuOpen = false; 
    this.createTaskWindow = true; 
  }

  handleCreateTask = async () => { 
    await this.createNewTask(); 
  }

  private async createNewTask() {
    console.log('createNewTask iniciado', { title: this.taskTitle, description: this.taskDescription, userEmail: this.userEmail });
    
    if (!this.taskTitle || !this.taskDescription) {
      console.warn('Faltan campos requeridos');
      return;
    }

    try {
      const newTask = await this.restService.post('createTasks', {
        title: this.taskTitle,
        description: this.taskDescription,
        userEmail: this.userEmail,
        status: 'Ready To Start'
      });
      console.log('Task created:', newTask);
      this.createTaskWindow = false;
      this.taskTitle = '';
      this.taskDescription = '';
      super.ngOnInit();
    } catch (error) {
      console.error('Error creando tarea:', error);
      this.createTaskWindow = false;
    }
  }

  protected openCard(item: TaskInterface): void { 
    this.selectedTask = item;
    this.showModal = true; 
  }

  public clearInput(field: 'taskTitle' | 'taskDescription'): void {
    if (field === 'taskTitle') this.taskTitle = '';
    if (field === 'taskDescription') this.taskDescription = '';
  }

}
