import { Button } from 'antd';
import type { HeaderButtonProps } from '@shared/types/ui';

export const HeaderButton = ({
  onClick,
  children,
  type = 'default',
  danger = false,
  className,
}: HeaderButtonProps) => {
  return (
    <Button type={type} danger={danger} onClick={onClick} className={className}>
      {children}
    </Button>
  );
};
