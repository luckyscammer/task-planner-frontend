import {api} from "@/api/api.ts";
import {AssignUserDto, TaskAssignment, UpdateAssignmentDto} from "@/lib/types/taskAssignmenr.ts";

export async function assignUser(data: AssignUserDto) {
  const response = await api.post('/assignments', data);
  return response.data;
}

export async function getAllAssignments() {
  const response = await api.get<TaskAssignment[]>('/assignments');
  return response.data;
}

export async function getTasksOfUser(userId: string) {
  const response = await api.get(`/assignments/user/${userId}`);
  return response.data;
}

export async function getUsersOfTask(taskId: string) {
  const response = await api.get(`/assignments/task/${taskId}`);
  return response.data;
}

export async function getAssignment(userId: string, taskId: string) {
  const response = await api.get('/assignments/one', {
    params: { userId, taskId },
  });
  return response.data;
}

export async function updateAssignment(data: UpdateAssignmentDto) {
  const response = await api.put('/assignments', data);
  return response.data;
}

export async function unassignUser(userId: string, taskId: string) {
  const response = await api.delete('/assignments', {
    data: { userId, taskId },
  });
  return response.data;
}