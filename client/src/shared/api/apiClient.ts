import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { authStore } from '@entities/auth/model';

const API_BASE_URL = '/api/v1';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик ответов для обработки 401 ошибок
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Если получили 401 и пользователь был авторизован, сбрасываем авторизацию
      if (authStore.isAuth) {
        authStore.logout();
        window.location.href = '/login';
      }
      return Promise.reject(new Error('Не авторизован'));
    }
    return Promise.reject(error);
  },
);

export const apiClient = {
  get: <T>(endpoint: string): Promise<T> =>
    axiosInstance.get<T>(endpoint).then((response) => response.data),

  post: <T>(endpoint: string, data?: unknown): Promise<T> =>
    axiosInstance.post<T>(endpoint, data).then((response) => response.data),

  put: <T>(endpoint: string, data?: unknown): Promise<T> =>
    axiosInstance.put<T>(endpoint, data).then((response) => response.data),

  patch: <T>(endpoint: string, data?: unknown): Promise<T> =>
    axiosInstance.patch<T>(endpoint, data).then((response) => response.data),

  delete: <T>(endpoint: string): Promise<T> =>
    axiosInstance.delete<T>(endpoint).then((response) => response.data),
};
