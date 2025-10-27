'use client';
import { ModalButtons } from './ModalButtons';
import { ModalContainer } from './ModalContainer';
import { ModalMessage } from './ModalMessage';
import { ModalProps } from './ModalProps';
import { ModalTitle } from './ModalTitle';

export function Modal({ title, icon, message, color, id, handleConfirm }: ModalProps) {
  return (
    <ModalContainer id={id}>
      <ModalTitle id={id} title={title} icon={icon} color={color} />
      <ModalMessage message={message} />
      <ModalButtons id={id} color={color} handleConfirm={handleConfirm} />
    </ModalContainer>
  );
}
