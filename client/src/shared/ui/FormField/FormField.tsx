import { Input, Select, DatePicker, Checkbox } from 'antd';
import dayjs from 'dayjs';
import type { FormFieldProps } from '@shared/types/form';
import styles from '../../styles/common.module.css';

export const FormField = (props: FormFieldProps) => {
  const { label, name, error, touched, required } = props;
  const hasError = touched && error;

  const renderField = () => {
    switch (props.type) {
      case 'input':
      case 'password': {
        const InputComponent =
          props.type === 'password' ? Input.Password : Input;
        return (
          <InputComponent
            name={name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            status={hasError ? 'error' : ''}
          />
        );
      }

      case 'select':
        return (
          <Select
            value={props.value}
            onChange={props.onChange}
            options={props.options}
            allowClear={props.allowClear}
            className={styles.fullWidth}
          />
        );

      case 'datepicker':
        return (
          <DatePicker
            value={props.value ? dayjs(props.value) : undefined}
            onChange={props.onChange}
            className={styles.fullWidth}
          />
        );

      case 'checkbox':
        return (
          <div className={styles.checkboxContainer}>
            <Checkbox
              checked={props.checked}
              onChange={(e) => props.onChange(e.target.checked)}
            />
            <span
              className={styles.checkboxLabel}
              onClick={() => props.onChange(!props.checked)}
            >
              {label}
              {required && <span style={{ color: '#ff4d4f' }}> *</span>}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.fieldContainer}>
      {props.type !== 'checkbox' && (
        <label>
          {label}
          {required && <span style={{ color: '#ff4d4f' }}> *</span>}
        </label>
      )}
      {renderField()}
      {hasError && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
