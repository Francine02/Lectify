'use client';

import { useTheme } from '@/contexts/Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast() {
  const { resolved } = useTheme();

  return <ToastContainer position="top-right" autoClose={6000} theme={resolved} />;
}
