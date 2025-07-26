import { useEffect } from 'react';
import { FormField } from '../FormField';
import { employmentOptions } from '@shared/constants';
import { useAutoFill } from '@shared/hooks/useAutoFill';
import type { UserFormProps } from '@shared/types/ui';
import styles from '@shared/styles/common.module.css';

export const UserForm = ({
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  isEdit = false,
}: UserFormProps) => {
  const { createNameAutoFill } = useAutoFill();
  const autoFillFullName = createNameAutoFill(setFieldValue, 'fullName');

  // Автоматически обновляем fullName при инициализации формы в режиме редактирования
  useEffect(() => {
    if (isEdit && values.name && values.surName) {
      const expectedFullName = `${values.name} ${values.surName}`.trim();
      if (values.fullName !== expectedFullName) {
        autoFillFullName(values.name, values.surName);
      }
    }
  }, [isEdit, values.name, values.surName, values.fullName, autoFillFullName]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    autoFillFullName(e.target.value, values.surName);
  };

  const handleSurNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    autoFillFullName(values.name, e.target.value);
  };

  return (
    <>
      <div className={styles.formRow}>
        <FormField
          type="input"
          label="Имя"
          name="name"
          value={values.name}
          onChange={handleNameChange}
          error={errors.name}
          touched={touched.name}
          required={true}
        />

        <FormField
          type="input"
          label="Фамилия"
          name="surName"
          value={values.surName}
          onChange={handleSurNameChange}
          error={errors.surName}
          touched={touched.surName}
          required={true}
        />
      </div>

      <FormField
        type="input"
        label="Полное имя"
        name="fullName"
        value={values.fullName}
        onChange={handleChange}
        error={errors.fullName}
        touched={touched.fullName}
        required={true}
      />

      {!isEdit && (
        <FormField
          type="input"
          label="Email"
          name="email"
          value={values.email || ''}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
          required={true}
        />
      )}

      {!isEdit && (
        <div className={styles.formRow}>
          <FormField
            type="password"
            label="Пароль"
            name="password"
            value={values.password || ''}
            onChange={handleChange}
            error={errors.password}
            touched={touched.password}
            required={true}
          />

          <FormField
            type="password"
            label="Подтверждение пароля"
            name="confirmPassword"
            value={values.confirmPassword || ''}
            onChange={handleChange}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            required={true}
          />
        </div>
      )}

      <FormField
        type="datepicker"
        label="Дата рождения"
        name="birthDate"
        value={values.birthDate}
        onChange={(date) =>
          setFieldValue('birthDate', date ? date.toISOString() : '')
        }
        error={errors.birthDate}
        touched={touched.birthDate}
      />

      <FormField
        type="input"
        label="Телефон"
        name="telephone"
        value={values.telephone}
        onChange={handleChange}
        placeholder="+79211234567"
        error={errors.telephone}
        touched={touched.telephone}
      />

      <FormField
        type="select"
        label="Занятость"
        name="employment"
        value={values.employment}
        onChange={(value) => setFieldValue('employment', value)}
        options={employmentOptions}
        allowClear
        error={errors.employment}
        touched={touched.employment}
      />

      <FormField
        type="checkbox"
        label="Согласие пользователя"
        name="userAgreement"
        checked={values.userAgreement}
        onChange={(checked) => setFieldValue('userAgreement', checked)}
        error={errors.userAgreement}
        touched={touched.userAgreement}
      />
    </>
  );
};
