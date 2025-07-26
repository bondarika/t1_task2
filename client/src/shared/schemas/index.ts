import { z } from 'zod';

export const userCreateSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Имя обязательно')
      .max(64, 'Имя не должно превышать 64 символа'),
    surName: z
      .string()
      .min(1, 'Фамилия обязательна')
      .max(64, 'Фамилия не должна превышать 64 символа'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string(),
    fullName: z
      .string()
      .min(1, 'Полное имя обязательно')
      .max(130, 'Полное имя не должно превышать 130 символов'),
    email: z.string().email('Некорректный email'),
    birthDate: z.string().optional(),
    telephone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^\+7\d{10}$/.test(val),
        'Номер телефона должен быть в формате +79211234567'
      ),
    employment: z.string().optional(),
    userAgreement: z
      .boolean()
      .optional()
      .refine((val) => val === true, 'Необходимо согласие пользователя'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(1, 'Имя обязательно')
    .max(64, 'Имя не должно превышать 64 символа'),
  surName: z
    .string()
    .min(1, 'Фамилия обязательна')
    .max(64, 'Фамилия не должна превышать 64 символа'),
  fullName: z
    .string()
    .min(1, 'Полное имя обязательно')
    .max(130, 'Полное имя не должно превышать 130 символов'),
  birthDate: z.string().optional(),
  telephone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+7\d{10}$/.test(val),
      'Номер телефона должен быть в формате +79211234567'
    ),
  employment: z.string().optional(),
  userAgreement: z.boolean().optional(),
});
