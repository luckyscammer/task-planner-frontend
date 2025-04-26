export type Role = 'ADMIN' | 'MANAGER' | 'USER';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Role;
}
