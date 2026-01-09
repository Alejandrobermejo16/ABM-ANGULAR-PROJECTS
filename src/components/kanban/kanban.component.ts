import { Component, ViewChild, ViewEncapsulation, NgZone, OnInit, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GridPanelModule, GridPanelHeaderModule, CardModule, WindowModule, SideActionPanelModule } from 'pantheon-libraries';
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
  styleUrls: ['./kanban.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    GridPanelModule,
    GridPanelHeaderModule,
    CardModule,
    WindowModule,
    SideActionPanelModule,
    InitialLoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class KanbanComponent implements OnInit {
  
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
    private ngZone: NgZone, 
    @Inject(PLATFORM_ID) platformId: Object,
    private http: HttpClient
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.dataColumns = this.columns.map(name => ({ name, items: [] }));
  }

  ngOnInit(): void {
    this.loadUserFromSession();
    if (this.userEmail) {
      this.isLoggedIn = true;
      this.loadTasks();
    }
  }

  private loadUserFromSession() {
    const email = sessionStorage.getItem('userEmail');
    if (email) this.userEmail = email;
  }

  onLoginSuccess(userData: any) {
    this.userEmail = userData.email;
    this.isLoggedIn = true;
    this.loadTasks();
  }

  // Cargar tareas
  private loadTasks(): void {
    // TODO: Integrar backend API para obtener tareas
    // this.restService.get<{ tasks: TaskInterface[] }>('getTasks', { userEmail: this.userEmail })
    //   .then((response: any) => {
    //     if (response?.tasks) {
    //       const columnsMap: Record<string, TaskInterface[]> = {
    //         'Ready To Start': [],
    //         'In Progress': [],
    //         'Ready to verify/Deploy': [],
    //         'Deployed': []
    //       };
    //       response.tasks.forEach((task: TaskInterface) => {
    //         const statusKey = task.status?.toLowerCase();
    //         const columnName = STATUS_MAP[statusKey];
    //         if (columnName) columnsMap[columnName].push(task);
    //       });
    //       this.dataColumns = Object.keys(columnsMap).map(key => ({ name: key, items: columnsMap[key] }));
    //     }
    //   })
    //   .catch((err: any) => console.error('Error cargando tareas:', err));
    console.log('Loading tasks for user:', this.userEmail);
  }

  // Eventos
  protected onTaskMoved(event: any) {
    // TODO: Integrar backend API para actualizar estado
    const newStatus = this.columns[event.toIndex];
    // this.restService.patch('updateTaskStatus', {
    //   taskId: event.task._id,
    //   status: newStatus
    // })
    //   .then(() => console.log('Tarea actualizada'))
    //   .catch((err: any) => console.error('Error actualizando tarea:', err));
    console.log('Task moved to:', newStatus);
  }

  private openCreateModal() { 
    this.isMenuOpen = false; 
    this.createTaskWindow = true; 
  }

  handleCreateTask = async () => { 
    await this.createNewTask(); 
  }

  private async createNewTask() {
    try {
      // TODO: Integrar backend API para crear tarea
      // const newTask = await this.restService.post('createTasks', {
      //   title: this.taskTitle,
      //   description: this.taskDescription,
      //   userEmail: this.userEmail,
      //   status: 'Ready To Start'
      // });
      console.log('Creating task:', {
        title: this.taskTitle,
        description: this.taskDescription,
        userEmail: this.userEmail,
        status: 'Ready To Start'
      });
      this.createTaskWindow = false;
      this.taskTitle = '';
      this.taskDescription = '';
      // Recargar tareas
      this.loadTasks();
    } catch (error) {
      console.error('Error creando tarea:', error);
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
