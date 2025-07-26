/* eslint-disable no-unused-vars */
import type { Dayjs } from 'dayjs';

export interface BaseFormFieldProps {
  label: string;
  name: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export interface InputFormFieldProps extends BaseFormFieldProps {
  type: 'input' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface SelectFormFieldProps extends BaseFormFieldProps {
  type: 'select';
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allowClear?: boolean;
}

export interface DatePickerFormFieldProps extends BaseFormFieldProps {
  type: 'datepicker';
  value: string;
  onChange: (date: Dayjs | null) => void;
}

export interface CheckboxFormFieldProps extends BaseFormFieldProps {
  type: 'checkbox';
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export type FormFieldProps =
  | InputFormFieldProps
  | SelectFormFieldProps
  | DatePickerFormFieldProps
  | CheckboxFormFieldProps;
