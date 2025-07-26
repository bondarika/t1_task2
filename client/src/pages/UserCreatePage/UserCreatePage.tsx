import { Formik } from 'formik';
import { Button } from 'antd';
import { createUser } from '@entities/users/api';
import type { UserCreateRequest } from '@shared/types/user';
import { userCreateSchema } from '@shared/schemas';
import { createZodValidator } from '@shared/utils/validation';
import { FormContainer, UserForm } from '@shared/ui';
import { useFormSubmit } from '@shared/hooks/useFormSubmit';
import styles from './UserCreatePage.module.css';

const validate = createZodValidator(userCreateSchema);

export const UserCreatePage = () => {
  const { submitForm, loading, messageContext } = useFormSubmit({
    successMessage: 'Пользователь создан',
    redirectTo: '/',
  });

  return (
    <>
      {messageContext}
      <Formik
        initialValues={{
          name: '',
          surName: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          email: '',
          birthDate: '',
          telephone: '',
          employment: '',
          userAgreement: false,
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { confirmPassword, ...data } = values;

          // Отправляем только заполненные поля
          const requestData: any = {
            name: data.name,
            surName: data.surName,
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            userAgreement: data.userAgreement,
            employment: data.employment || '',
          };

          // Добавляем опциональные поля только если они заполнены
          if (data.birthDate && data.birthDate.trim() !== '') {
            requestData.birthDate = data.birthDate;
          }
          if (data.telephone && data.telephone.trim() !== '') {
            requestData.telephone = data.telephone;
          }

          console.log('Отправляемые данные для создания пользователя:', requestData);

          await submitForm(async () => {
            await createUser(requestData as UserCreateRequest);
          }, 'Ошибка создания пользователя');
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <FormContainer
            title="Создание пользователя"
            className={styles.formContainer}
          >
            <UserForm
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              isEdit={false}
            />
            <Button type="primary" htmlType="submit" loading={loading} block>
              Создать пользователя
            </Button>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};
