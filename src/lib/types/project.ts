export interface Project {
  id: string;
  name: string;
  description?: string;
  createdById: string;
  createdAt: string;
  progress?: number;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
  createdById: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
}