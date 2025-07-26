import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@pages/HomePage/HomePage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { UserCreatePage } from '@pages/UserCreatePage/UserCreatePage';
import { UserEditPage } from '@pages/UserEditPage/UserEditPage';
import { AppLayout } from './AppLayout/AppLayout';
import { PrivateRoute } from '@shared/ui/PrivateRoute/PrivateRoute';

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<HomePage />} />
      <Route path="user/create" element={<UserCreatePage />} />
      <Route path="user/edit/:id" element={<UserEditPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
