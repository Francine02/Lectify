import { ElementType } from 'react';

export interface ModalProps {
  title: string;
  icon?: ElementType;
  message: string;
  color: string;
  id: string;
  handleConfirm: () => void;
}
