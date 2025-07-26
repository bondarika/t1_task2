import { makeAutoObservable, runInAction } from 'mobx';
import * as api from './api';
import type { AuthUser } from '@shared/types';

export class AuthStore {
  user: AuthUser | null = null;
  isAuth = false;
  loading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = '';
    try {
      const user = await api.login(email, password);
      runInAction(() => {
        this.user = user;
        this.isAuth = true;
      });
    } catch (e) {
      runInAction(() => {
        this.error = (e as Error).message || 'Ошибка авторизации';
        this.isAuth = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async checkAuth() {
    this.loading = true;
    try {
      const user = await api.me();
      runInAction(() => {
        this.user = user;
        this.isAuth = true;
      });
    } catch {
      runInAction(() => {
        this.user = null;
        this.isAuth = false;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async logout() {
    if (this.isAuth) {
      this.user = null;
      this.isAuth = false;
      try {
        await api.logout();
      } catch (error) {
        console.warn('Logout request failed:', error);
      }
    }
  }
}

export const authStore = new AuthStore();
