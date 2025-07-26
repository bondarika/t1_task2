// Базовый тип пользователя
export interface BaseUser {
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

// Тип пользователя с ID и email
export interface User extends BaseUser {
  id: string;
  email: string;
  password?: string;
}

// Тип для создания пользователя
export interface UserCreateRequest extends BaseUser {
  password: string;
  email: string;
}

// Тип для обновления пользователя (все поля опциональные)
export interface UserUpdateRequest {
  name?: string;
  surName?: string;
  fullName?: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}
