export interface TaskAssignment {
  taskId: string;
  userId: string;
  assignedAt: string;
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
