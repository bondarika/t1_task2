import { apiClient } from '@shared/api/apiClient';
import type { AuthUser } from '@shared/types';

export async function login(
  email: string,
  password: string
): Promise<AuthUser> {
  try {
    return await apiClient.post('/auth/login', { email, password });
  } catch {
    throw new Error('Неверный email или пароль');
  }
}

export async function me(): Promise<AuthUser> {
  return await apiClient.get('/auth/me');
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}
