import { TaskAssignment } from '@/lib/types/taskAssignment.ts';

export type TaskStatus =
  | 'UNASSIGNED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'PENDING_REVIEW'
  | 'COMPLETED';

export interface Task {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  status: TaskStatus;
  deadline?: string;
  progress: number;
  createdAt: string;
  assignments: TaskAssignment[];
}

export interface CreateTaskDto {
  name: string;
  description?: string;
  status?: Task['status'];
  projectId: string;
  userId?: string;
  deadline?: string;
}

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  status?: Task['status'];
  userId?: string;
  deadline?: string;
}
