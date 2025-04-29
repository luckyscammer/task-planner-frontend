import { api } from '@/api/api.ts';
import { CreateProjectDto, UpdateProjectDto } from '@/lib/types/project.ts';

export async function createProject(data: CreateProjectDto) {
  const response = await api.post('/projects', data);
  return response.data;
}

export async function getAllProjects() {
  const response = await api.get('/projects');
  return response.data;
}

export async function getProjectById(id: string) {
  const response = await api.get(`/projects/${id}`);
  return response.data;
}

export async function updateProject(id: string, data: UpdateProjectDto) {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
}

export async function deleteProject(id: string) {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
}

export async function getProjectStatus(id: string) {
  const response = await api.get(`/projects/${id}/status`);
  return response.data;
}
