import { Component, PLATFORM_ID, Inject, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { GridPanelModule, GridPanelHeaderModule, CardModule, WindowModule, SideActionPanelModule, LoaderComponent
 } from 'pantheon-libraries';
import { PantheonBaseComponent, PantheonRestService } from 'pantheon-libraries/core';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { TaskDetailsModalComponent } from './task-details-modal/task-details-modal.component';
import { TaskInterface, Action, CreateTaskResponse } from './task-details-modal/interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule, MatCheckboxChange} from '@angular/material/checkbox';

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
    MatSelectModule,
    GridPanelModule,
    GridPanelHeaderModule,
    CardModule,
    WindowModule,
    SideActionPanelModule,
    InitialLoginComponent,
    TaskDetailsModalComponent,
    MatSlideToggleModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    LoaderComponent
  ]
})
export class KanbanComponent extends PantheonBaseComponent {
  
  public title: string = 'kanban-board';
  public showModal: boolean = false;
  public selectedTask: TaskInterface | null = null;
  public columns: string[] = ['Ready To Start', 'In Progress', 'Ready to verify/Deploy', 'Deployed'];
  public dataColumns: Array<{ name: string; items: TaskInterface[] }> = [];
  public isMenuOpen: boolean = false;
  public createTaskWindow: boolean = false;
  public taskTitle: string = '';
  public taskDescription: string = '';
  public userEmail: string = '';
  public isLoggedIn: boolean = false;
  public showModalDelete: boolean = false;
  private isBrowser: boolean = false;
  public autoDeleteEnabled: boolean = false;
  public deleteDaysOptions: string[] = ['1','3','7','14','custom'];
  public selectedDeleteDays: string = '0';
  public customDeleteDays: number | null = null;
  public isLoading: boolean = false;
  public isMultiSelectMode: boolean = false;
  public selectedTaskIds: Set<string> = new Set();

  public fieldActions: Action[] = [
    { label: 'Añadir tarea', icon: '➕', type: 'primary', callback: () => this.openCreateModal() },
    { label: 'Eliminar', icon: '🗑', type: 'danger', callback: () => this.toggleMultiSelectMode() },
  ];

  public prioritys = [
    { label: 'Baja', value: 'baja' },
    { label: 'Media', value: 'media' },
    { label: 'Alta', value: 'alta' }
  ];
  public taskPriority: string = 'baja';

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
      this.isLoading = true;
      super.ngOnInit();
    }
  }

  private loadUserFromSession() {
    if (!this.isBrowser || typeof sessionStorage === 'undefined') return;
    const email = sessionStorage.getItem('userEmail');
    if (email) this.userEmail = email;
  }

  public onLoginSuccess(userData: any) {
    this.userEmail = userData.email;
    this.isLoggedIn = true;
    this.isLoading = true;
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
        if (task.autoDeleteDate) {
          this.autoDeleteEnabled = true;
        }
      });
      this.dataColumns = Object.keys(columnsMap).map(key => ({ name: key, items: columnsMap[key] }));
      this.getTaskForDelete(data?.tasks);
    }
    this.isLoading = false;
  }

  protected async onTaskMoved(event: any) {
    const task = event.task;
    const toColumnIndex = event.toIndex;
    const newStatus = this.columns[toColumnIndex];
    task.status = newStatus;
    try {
      await this.restService.patch('updateTaskStatus', {
        taskId: task._id,
        status: newStatus
      });
      console.log('Tarea actualizada');
    } catch (err) {
      console.error('Error actualizando tarea:', err);
    }
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
      const apiResponse = await this.restService.post<CreateTaskResponse>('createTasks', {
        title: this.taskTitle,
        description: this.taskDescription,
        userEmail: this.userEmail,
        status: 'Ready To Start'
      });
      
      const newTask: TaskInterface = {
        _id: apiResponse?._id ?? apiResponse?.taskId,
        title: apiResponse?.title ?? this.taskTitle,
        description: apiResponse?.description ?? this.taskDescription,
        status: apiResponse?.status ?? 'Ready To Start',
        userEmail: apiResponse?.userEmail ?? this.userEmail,
        createdAt: apiResponse?.createdAt ?? new Date().toISOString(),
        assignedUserEmail: apiResponse?.assignedUserEmail
      };

      console.log('Task created (normalized):', newTask);

      this.dataColumns = this.dataColumns.map((col, index) => {
        if (index === 0) {
          return { ...col, items: [...col.items, newTask] };
        }
        return col;
      });
      
      this.createTaskWindow = false;
      this.taskTitle = '';
      this.taskDescription = '';
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

  protected deleteTask(item: TaskInterface): void { 
    this.showModalDelete = true;
    this.selectedTask = item;
  }

  onEditTask(task: TaskInterface): void {
    console.log('Edit task:', task);
    this.showModal = false;
  }

  getDaysRemaining(autoDeleteDate: string | undefined): number | null {
    if (!autoDeleteDate) return null;
    
    const now = new Date();
    const deleteDate = new Date(autoDeleteDate);
    const diffTime = deleteDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  }

  handleDeleteTask = async () => {
    if (!this.selectedTask?._id) return;

    try {
      await this.restService.delete(`deleteTasks/${this.selectedTask._id}`);
      console.log('Tarea eliminada');
      
      this.dataColumns.forEach(column => {
        column.items = column.items.filter(task => task._id !== this.selectedTask?._id);
      });
      
      this.showModalDelete = false;
      this.selectedTask = null;
    } catch (err) {
      console.error('Error eliminando tarea:', err);
      this.showModalDelete = false;
    }
  }

  async saveAutoDeleteSettings() {
    const days = this.selectedDeleteDays === 'custom'
      ? this.customDeleteDays
      : parseInt(this.selectedDeleteDays, 10);

    try {
      if (this.autoDeleteEnabled) {
        await this.restService.post('sendDeletePolicityTask', {
          userEmail: this.userEmail,
          deletedDays: days
        });
      }
      else {
        await this.restService.post('disabledPolicityDeleteTask', {
          userEmail: this.userEmail,
        });
        this.autoDeleteEnabled = false;
      }
      super.ngOnInit();
      this.createTaskWindow = false;
      this.isMenuOpen = false;
    } catch (error: any) {
      console.error('Error creating task:', error);
      this.createTaskWindow = false;
    }
  }

  private async getTaskForDelete(data: any) {
    const tasksArray: TaskInterface[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.tasks)
        ? data.tasks
        : [];

    const deployedWithAutoDelete = tasksArray.filter(t =>
      t?.autoDeleteDate != null &&
      !isNaN(new Date(t.autoDeleteDate).getTime()) &&
      t?.status?.toLowerCase() === 'deployed'
    );

    const dueTasks = deployedWithAutoDelete.filter(t => {
      const daysRemaining = this.getDaysRemaining(t.autoDeleteDate);
      return daysRemaining !== null && daysRemaining <= 1;
    });

    const dueTaskIds = dueTasks.map(t => String(t._id)).filter(Boolean);
    if (dueTaskIds.length === 0) return;

    try {
      await this.restService.post('deleteTasks', { taskIds: dueTaskIds });
    } catch (err) {
      console.error('Error eliminando tareas vencidas:', err);
    }
  }

  toggleMultiSelectMode(): void {
    this.isMultiSelectMode = !this.isMultiSelectMode;
    if (!this.isMultiSelectMode) {
      this.selectedTaskIds.clear();
    }
    this.isMenuOpen = false;
  }

  toggleTaskSelection(taskId: string, event: MatCheckboxChange): void {
    if (event.checked) {
      this.selectedTaskIds.add(taskId);
    } else {
      this.selectedTaskIds.delete(taskId);
    }
  }

  isTaskSelected(taskId: string): boolean {
    return this.selectedTaskIds.has(taskId);
  }
}

