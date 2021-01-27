import React from 'react';
import './styles.css';

export default function Button({
  children,
  disabled = false,
  type = 'button',
  onClick,
  isSecondary,
  className,
  ...ortherProps
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${isSecondary ? '__rival_button_secondary' : '__rival_button'} `}
      {...ortherProps}
    >
      {children}
    </button>
  );
}
