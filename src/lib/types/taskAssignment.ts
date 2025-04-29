import { User } from '@/lib/types/user.ts';

export interface TaskAssignment {
  taskId: string;
  userId: string;
  assignedAt: string;
  user: User;
}

export interface AssignUserDto {
  userId: string;
  taskId: string;
}

export interface UpdateAssignmentDto {
  userId: string;
  taskId: string;

  [key: string]: any;
}
