import { api } from '@/api/api.ts';
import { CreateTaskDto, UpdateTaskDto } from '@/lib/types/task.ts';

export async function createTask(data: CreateTaskDto) {
  const response = await api.post('/tasks', data);
  return response.data;
}

export async function getAllTasks() {
  const response = await api.get('/tasks');
  return response.data;
}

export async function getTaskById(id: string) {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
}

export async function updateTask(id: string, data: UpdateTaskDto) {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
}

export async function deleteTask(id: string) {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}

export async function getFilteredTasks(filters: Record<string, any>) {
  const response = await api.get('/tasks/filter', { params: filters });
  return response.data;
}
