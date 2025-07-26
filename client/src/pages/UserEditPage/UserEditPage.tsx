import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Spin } from 'antd';
import { getUserById, updateUser } from '@entities/users/api';
import type { User, UserUpdateRequest } from '@shared/types/user';
import { userUpdateSchema } from '@shared/schemas';
import { createZodValidator } from '@shared/utils/validation';
import { FormContainer, UserForm } from '@shared/ui';
import { useFormSubmit } from '@shared/hooks/useFormSubmit';
import styles from './UserEditPage.module.css';
import commonStyles from '@shared/styles/common.module.css';

const validate = createZodValidator(userUpdateSchema);

export const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [init, setInit] = useState<{
    name: string;
    surName: string;
    fullName: string;
    birthDate: string;
    telephone: string;
    employment: string;
    userAgreement: boolean;
  } | null>(null);

  const {
    submitForm,
    loading: submitLoading,
    messageContext,
    handleError,
  } = useFormSubmit({
    successMessage: 'Пользователь обновлен',
    redirectTo: '/',
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const user = (await getUserById(id)) as User;
        const name = user.name || '';
        const surName = user.surName || '';
        const fullName = user.fullName || `${name} ${surName}`.trim();
        setInit({
          name,
          surName,
          fullName,
          birthDate: user.birthDate || '',
          telephone: user.telephone || '',
          employment: user.employment || '',
          userAgreement: !!user.userAgreement,
        });
      } catch (error) {
        handleError(error, 'Ошибка загрузки пользователя');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, handleError]);

  if (loading || !init) {
    return <Spin className={commonStyles.centerBlock} />;
  }

  return (
    <>
      {messageContext}
      <Formik
        initialValues={init}
        enableReinitialize
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          // Фильтруем пустые значения для опциональных полей
          const filteredValues = {
            name: values.name,
            surName: values.surName,
            fullName: values.fullName,
            ...(values.birthDate &&
              values.birthDate.trim() !== '' && {
                birthDate: values.birthDate,
              }),
            ...(values.telephone &&
              values.telephone.trim() !== '' && {
                telephone: values.telephone,
              }),
            ...(values.employment &&
              values.employment.trim() !== '' && {
                employment: values.employment,
              }),
            ...(values.userAgreement && {
              userAgreement: values.userAgreement,
            }),
          };

          console.log('Отправляемые данные:', filteredValues);

          await submitForm(async () => {
            await updateUser(id!, filteredValues as UserUpdateRequest);
          }, 'Ошибка обновления пользователя');
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <FormContainer
            title="Редактирование пользователя"
            className={styles.formContainer}
          >
            <UserForm
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              isEdit={true}
            />
            <div className={styles.buttonContainer}>
              <Button
                type="default"
                onClick={() => navigate('/')}
                className={styles.cancelButton}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                className={styles.submitButton}
              >
                Сохранить изменения
              </Button>
            </div>
          </FormContainer>
        )}
      </Formik>
    </>
  );
};
