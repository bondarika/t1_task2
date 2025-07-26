import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table } from 'antd';
import { usersStore } from '@entities/users/model';
import { useNavigate } from 'react-router-dom';
import { TableActions } from '@shared/ui/TableActions';
import styles from './HomePage.module.css';
import type { User } from '@shared/types/user';

export const HomePage = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    usersStore.fetchUsers();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 150 },
    { title: 'Имя', dataIndex: 'name', key: 'name', width: 80 },
    { title: 'Фамилия', dataIndex: 'surName', key: 'surName', width: 80 },
    { title: 'Полное имя', dataIndex: 'fullName', key: 'fullName', width: 120 },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      key: 'birthDate',
      width: 100,
      render: (birthDate: string) =>
        birthDate ? new Date(birthDate).toLocaleDateString('ru-RU') : '-',
    },
    {
      title: 'Телефон',
      dataIndex: 'telephone',
      key: 'telephone',
      width: 110,
      render: (telephone: string) => telephone || '-',
    },
    {
      title: 'Занятость',
      dataIndex: 'employment',
      key: 'employment',
      width: 100,
      render: (employment: string) => employment || '-',
    },
    {
      title: 'Согласие',
      dataIndex: 'userAgreement',
      key: 'userAgreement',
      width: 70,
      render: (userAgreement: boolean) => (userAgreement ? 'Да' : 'Нет'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 80,
      fixed: 'right' as const,
      render: (_: unknown, record: User) => (
        <TableActions
          onEdit={() => navigate(`/user/edit/${record.id}`)}
          onDelete={() => usersStore.deleteUser(record.id)}
          deleteConfirmTitle="Удалить пользователя?"
        />
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={usersStore.users}
        loading={usersStore.loading}
        pagination={false}
        className={styles.table}
        size="small"
      />
    </div>
  );
});
