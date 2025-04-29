import { api } from '@/api/api.ts';
import { Task } from '@/lib/types/task.ts';
import { CreateUserDto, UpdateUserDto, User } from '@/lib/types/user.ts';

export async function createUser(data: CreateUserDto) {
  const response = await api.post('/users', data);
  return response.data;
}

export async function getAllUsers() {
  const response = await api.get<User[]>('/users');
  return response.data;
}

export async function getUserById(id: string) {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUser(id: string, data: UpdateUserDto) {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
}

export async function deleteUser(id: string) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}

export async function getTasksOfUser(userId: string) {
  const { data } = await api.get<Task[]>(`/assignments/user/${userId}`);
  return data;
}
