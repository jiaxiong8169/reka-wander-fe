import {useContext} from 'react';
import {HttpContext} from '../providers/HttpProvider';

export const useHttpCall = () => {
  const context = useContext(HttpContext);

  if (!context) {
    throw new Error('useHttpCall must used within an HttpProvider');
  }

  return context;
};
