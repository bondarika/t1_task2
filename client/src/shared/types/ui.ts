/* eslint-disable no-unused-vars */

export interface HeaderButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  danger?: boolean;
  className?: string;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  deleteConfirmTitle?: string;
  deleteConfirmOkText?: string;
  deleteConfirmCancelText?: string;
}

export interface UserFormProps {
  values: {
    name: string;
    surName: string;
    fullName: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    birthDate: string;
    telephone: string;
    employment: string;
    userAgreement: boolean;
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: unknown) => void;
  isEdit?: boolean;
}
