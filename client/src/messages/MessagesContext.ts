import type { AlertColor } from '@mui/material';
import { createContext } from 'react';

type MessagesContextType = {
  showMessage: (message: string, severity: AlertColor) => void;
};

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined,
);
