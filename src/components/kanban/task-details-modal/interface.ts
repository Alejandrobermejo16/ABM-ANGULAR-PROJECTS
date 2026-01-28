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
    autoDeleteDate?: string;
    userEmail?: string;
    createdAt?: string;
    asignedPerson?: string;
    assignedUserEmail?: string;
}


export type CreateTaskResponse = Partial<TaskInterface> & {
    message?: string;
    taskId?: string;
};