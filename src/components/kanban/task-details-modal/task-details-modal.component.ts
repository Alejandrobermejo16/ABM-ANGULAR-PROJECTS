import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PantheonRestService } from 'pantheon-libraries/core';
import { TaskInterface } from './interface';



@Component({
    selector: 'app-task-details-modal',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './task-details-modal.component.html',
    styleUrls: ['./task-details-modal.component.scss']
})
export class TaskDetailsModalComponent {
    private _task: TaskInterface | null = null;
    
    @Input() 
    set task(value: TaskInterface | null) {
        this._task = value;
        if (value) {
            this.asignedPerson = value.assignedUserEmail || null;
            console.log("prueba", value);
        }
    }
    get task(): TaskInterface | null {
        return this._task;
    }
    
    @Input() show = false;
    @Output() showChange = new EventEmitter<boolean>();
    @Output() editTask = new EventEmitter<TaskInterface>();
    asignedPerson: string | null = null;


    constructor(
        private restService: PantheonRestService
    ) {
    }

    close() {
        this.show = false;
        this.showChange.emit(false);
    }

    onEdit() {
        if (this.task) {
            this.editTask.emit(this.task);
        }
    }

    protected async assignPerson() {
        this.asignedPerson = typeof sessionStorage !== 'undefined'
            ? sessionStorage.getItem('userEmail')
            : null;
        try {
            const result = await this.restService.post('assignTaskToUser', {
                task_id: this.task?._id,
                usermail: this.asignedPerson
            });
            console.log('Persona asignada:', result);
            if (this.task && this.asignedPerson) {
                this.task.asignedPerson = this.asignedPerson;
            }
        } catch (error) {
            console.error('Error asignando persona:', error);
        }
    }

    get statusConfig() {
        const statusMap: Record<string, { label: string; color: string; bg: string }> = {
            'ready to start': { label: 'Ready To Start', color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.2)' },
            'in progress': { label: 'In Progress', color: '#137fec', bg: 'rgba(19, 127, 236, 0.2)' },
            'ready to verify/deploy': { label: 'Ready to Verify', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' },
            'deployed': { label: 'Deployed', color: '#10b981', bg: 'rgba(16, 185, 129, 0.2)' }
        };

        const key = this.task?.status?.toLowerCase() || '';
        return statusMap[key] || statusMap['ready to start'];
    }
}
