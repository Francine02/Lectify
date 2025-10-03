'use client';
import { useState } from 'react';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { InputButton } from '../InputButton';
import { InputRoot } from '../InputRoot';
import { InputProps } from '../InputRoot/InputProps';

export function InputPassword({ label, id, ...props }: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InputRoot label={label} id={id} {...props} type={isVisible ? 'text' : 'password'}>
      <InputButton type="button" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? (
          <MdOutlineVisibilityOff className="size-5" />
        ) : (
          <MdOutlineVisibility className="size-5" />
        )}
      </InputButton>
    </InputRoot>
  );
}
