import { type AlertColor } from '@mui/material';
import { useState, useEffect } from 'react';
import { MessagesContext } from './MessagesContext';
import { MessageSnackbar } from './MessageSnackbar';
import type { Message } from './Message';

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queue, setQueue] = useState<Message[]>([]);
  const [current, setCurrent] = useState<Message | null>(null);

  const showMessage = (text: string, severity: AlertColor) => {
    setQueue((prev) => [...prev, { text, severity }]);
  };

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, current]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <MessagesContext.Provider value={{ showMessage }}>
      {children}
      {current && (
        <MessageSnackbar
          message={current.text}
          severity={current.severity}
          onClose={handleClose}
        />
      )}
    </MessagesContext.Provider>
  );
};
