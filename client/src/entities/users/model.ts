import { makeAutoObservable, runInAction } from 'mobx';
import * as api from './api';
import type { User, UserCreateRequest, UserUpdateRequest } from '@shared/types/user';

export class UsersStore {
  users: User[] = [];
  loading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    try {
      const users = await api.getUsers();
      runInAction(() => {
        this.users = users;
      });
    } catch (e) {
      runInAction(() => {
        this.error = (e as Error).message || 'Ошибка загрузки пользователей';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async deleteUser(id: string) {
    this.loading = true;
    try {
      await api.deleteUser(id);
      runInAction(() => {
        this.users = this.users.filter((u) => u.id !== id);
      });
    } catch (e) {
      runInAction(() => {
        this.error = (e as Error).message || 'Ошибка удаления пользователя';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const usersStore = new UsersStore();
export type { User, UserCreateRequest, UserUpdateRequest };
