import { useCallback } from 'react';
import { message } from 'antd';

export const useErrorHandler = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleError = useCallback(
    (error: unknown, defaultMessage: string) => {
      const errorMessage = error instanceof Error ? error.message : defaultMessage;
      messageApi.error(errorMessage);
    },
    [messageApi],
  );

  return { handleError, messageContext: contextHolder };
};
