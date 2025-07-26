import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Input, Button, Alert, Spin } from 'antd';
import { authStore } from '@entities/auth/model';
import styles from './LoginPage.module.css';
import commonStyles from '@shared/styles/common.module.css';

export const LoginPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  if (authStore.loading) {
    return <Spin className={commonStyles.centerBlock} />;
  }

  // Если пользователь уже авторизован, перенаправляем на главную
  if (authStore.isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Вход</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          await authStore.login(values.email, values.password);
          if (authStore.isAuth) navigate('/');
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label>Email</label>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="username"
              className={commonStyles.marginBottom12}
            />
            <label>Пароль</label>
            <Input.Password
              name="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={commonStyles.marginBottom12}
            />
            {authStore.error && (
              <Alert
                type="error"
                message={authStore.error}
                className={commonStyles.marginBottom12}
              />
            )}
            <Button
              type="primary"
              htmlType="submit"
              loading={authStore.loading}
              block
            >
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
