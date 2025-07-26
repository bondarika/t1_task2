import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Spin } from 'antd';
import { authStore } from '@entities/auth/model';
import type { PrivateRouteProps } from '@shared/types/ui';
import commonStyles from '@shared/styles/common.module.css';

export const PrivateRoute = observer(({ children }: PrivateRouteProps) => {
  if (authStore.loading) {
    return <Spin className={commonStyles.centerBlock} />;
  }

  if (!authStore.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
});
