'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast() {
  return <ToastContainer position="top-right" autoClose={6000} />;
}
