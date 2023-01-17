import { useToast } from '@chakra-ui/react';
import React from 'react';
import NotificationProvider from '../components/NotificationProvider';

export const useNotification = () => {
  const toast = useToast();

  const notify = title => {
    toast({
      position: 'top-right',
      duration: 3000,
      render: () => <NotificationProvider title={title} />,
    });
  };

  return { notify };
};
