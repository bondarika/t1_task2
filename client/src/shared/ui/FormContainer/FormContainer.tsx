import { Form } from 'formik';
import type { ReactNode } from 'react';
import styles from '../../styles/common.module.css';

interface FormContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const FormContainer = ({
  title,
  children,
  className,
}: FormContainerProps) => {
  return (
    <div className={className}>
      <h2 className={styles.formTitle}>{title}</h2>
      <Form className={styles.formContainer}>{children}</Form>
    </div>
  );
};
