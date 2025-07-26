import { apiClient } from '@shared/api/apiClient';
import type { User, UserCreateRequest, UserUpdateRequest } from '@shared/types/user';

// Получить список пользователей
export async function getUsers(): Promise<User[]> {
  return await apiClient.get('/users');
}

// Получить пользователя по id
export async function getUserById(id: string): Promise<User> {
  return await apiClient.get(`/users/${id}`);
}

// Создать пользователя
export async function createUser(data: UserCreateRequest): Promise<void> {
  return await apiClient.post('/users', data);
}

// Обновить пользователя
export async function updateUser(id: string, data: UserUpdateRequest): Promise<void> {
  return await apiClient.patch(`/users/${id}`, data);
}

// Удалить пользователя
export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
