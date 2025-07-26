/* eslint-disable no-unused-vars */
import { useCallback } from 'react';

export const useAutoFill = () => {
  const createNameAutoFill = useCallback(
    (setFieldValue: (field: string, value: unknown) => void, targetField: string) =>
      (name: string, surName: string) => {
        const fullName = `${name} ${surName}`.trim();
        setFieldValue(targetField, fullName);
      },
    [],
  );

  return { createNameAutoFill };
};
