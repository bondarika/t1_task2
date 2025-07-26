import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '@entities/auth/model';
import { HeaderButton } from '@shared/ui/HeaderButton';
import { menuItems } from './config/menuItems';
import styles from './AppLayout.module.css';

const { Header, Sider, Content } = Layout;

export const AppLayout = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    await authStore.logout();
    navigate('/login');
  };

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <span className={styles.headerTitle}>Т1</span>
        {authStore.isAuth ? (
          <HeaderButton
            onClick={handleLogout}
            danger
            className={styles.headerButton}
          >
            Выйти
          </HeaderButton>
        ) : (
          <HeaderButton onClick={handleLogin} className={styles.headerButton}>
            Войти
          </HeaderButton>
        )}
      </Header>
      <Layout>
      <Sider width={200} className={styles.sider}>
        <Menu
          mode="inline"
            selectedKeys={
              location.pathname === '/'
                ? ['home']
                : location.pathname === '/user/create'
                  ? ['create']
                  : []
            }
          className={styles.menu}
          items={menuItems}
        />
      </Sider>
        <Content className={styles.content}>
          <div className={styles.layoutContent}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
});
