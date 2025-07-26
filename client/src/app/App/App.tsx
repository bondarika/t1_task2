import { useEffect } from 'react';
import './App.module.css';
import { AppRouter } from '../AppRouter';
import { ConfigProvider } from 'antd';
import { theme } from '@shared/config/theme';
import { authStore } from '@entities/auth/model';

function App() {
  useEffect(() => {
    // Проверяем аутентификацию при загрузке приложения
    authStore.checkAuth();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className="app-root">
        <AppRouter />
      </div>
    </ConfigProvider>
  );
}

export default App;
