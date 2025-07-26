import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

interface UseFormSubmitOptions {
  onSuccess?: () => void;
  successMessage?: string;
  redirectTo?: string;
}

export const useFormSubmit = (options: UseFormSubmitOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleError = useCallback(
    (error: unknown, defaultMessage: string) => {
      const errorMessage =
        error instanceof Error ? error.message : defaultMessage;
      messageApi.error(errorMessage);
    },
    [messageApi]
  );

  const submitForm = async (
    submitFn: () => Promise<void>,
    errorMessage: string = 'Произошла ошибка'
  ) => {
    setLoading(true);
    try {
      await submitFn();

      if (options.successMessage) {
        messageApi.success(options.successMessage);
      }

      if (options.onSuccess) {
        options.onSuccess();
      }

      if (options.redirectTo) {
        navigate(options.redirectTo);
      }
    } catch (error) {
      handleError(error, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading, messageContext: contextHolder, handleError };
};
