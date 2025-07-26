import { Link } from 'react-router-dom';
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: 'home',
    label: <Link to="/">Главная</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: 'create',
    label: <Link to="/user/create">Создать</Link>,
    icon: <PlusOutlined />,
  },
];
