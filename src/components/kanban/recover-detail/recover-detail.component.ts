import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PantheonRestService } from 'pantheon-libraries/core';
import { TaskInterface } from './interface';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-recover-detail',
    standalone: true,
    imports: [CommonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatCheckboxModule, MatButtonModule],
    templateUrl: './recover-detail.component.html',
    styleUrls: ['./recover-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RecoverComponent implements OnChanges {
    @Input() show: boolean | undefined;
    @Output() showChange = new EventEmitter<boolean>();
    @Input() userEmail: string = '';
    @Output() tasksRecovered = new EventEmitter<void>();

    public deletedTasks: TaskInterface[] = [];
    public selectedTaskIds: Set<string> = new Set();
    public isLoading: boolean = false;

    constructor(
        private restService: PantheonRestService
    ) {}

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['show'] && this.show && this.userEmail) {
            await this.loadDeletedTasks();
        }
    }

    private async loadDeletedTasks() {
        this.isLoading = true;
        try {
            const response: any = await this.restService.get(`getDeletedTasks?userEmail=${this.userEmail}`);
            this.deletedTasks = response?.tasks || [];
        } catch (err) {
            this.deletedTasks = [];
        } finally {
            this.isLoading = false;
        }
    }

    toggleSelection(taskId: string, event: MatCheckboxChange) {
        if (event.checked) this.selectedTaskIds.add(taskId);
        else this.selectedTaskIds.delete(taskId);
    }

    isSelected(taskId: string): boolean {
        return this.selectedTaskIds.has(taskId);
    }

    getDaysRemaining(deletedAt: string): number {
        const deleteDate = new Date(deletedAt);
        deleteDate.setDate(deleteDate.getDate() + 30);
        const diff = deleteDate.getTime() - Date.now();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    async recoverSelected() {
        if (this.selectedTaskIds.size === 0) return;
        try {
            await Promise.all(
                Array.from(this.selectedTaskIds).map(taskId =>
                    this.restService.post('recoverTask', { taskId, userEmail: this.userEmail })
                )
            );
            this.selectedTaskIds.clear();
            this.tasksRecovered.emit();
            this.close();
        } catch (err) {
            console.error('Error recuperando tareas:', err);
        }
    }

    close() {
        this.show = false;
    }
}

