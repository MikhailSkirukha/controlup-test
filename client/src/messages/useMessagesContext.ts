import { useContext } from 'react';
import { MessagesContext } from './MessagesContext';

export const useMessages = () => {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
};
