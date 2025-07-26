import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableActionsProps } from '@shared/types/ui';

export const TableActions = ({
  onEdit,
  onDelete,
  deleteConfirmTitle = 'Вы уверены?',
  deleteConfirmOkText = 'Да',
  deleteConfirmCancelText = 'Нет',
}: TableActionsProps) => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {onEdit && (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
          size="small"
        />
      )}
      {onDelete && (
        <Popconfirm
          title={deleteConfirmTitle}
          onConfirm={onDelete}
          okText={deleteConfirmOkText}
          cancelText={deleteConfirmCancelText}
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      )}
    </div>
  );
};
