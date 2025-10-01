import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { MessagesProvider } from './messages/MessagesProvider.tsx';
import { CssBaseline } from '@mui/material';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <CssBaseline />
    <MessagesProvider>
      <App />
    </MessagesProvider>
  </StrictMode>,
);
