export interface Task {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  status: 'UNASSIGNED' | 'ASSIGNED' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'COMPLETED';
  deadline?: string;
  progress: number;
  createdAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: Task['status'];
  projectId: string;
  userId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: Task['status'];
  userId?: string;
}