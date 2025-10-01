import React from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';

interface MessageSnackbarProps {
  message: string;
  severity: AlertColor;
  onClose: () => void;
}

export const MessageSnackbar: React.FC<MessageSnackbarProps> = ({
  message,
  severity,
  onClose,
}) => (
  <Snackbar
    open
    autoHideDuration={4000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  >
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);
