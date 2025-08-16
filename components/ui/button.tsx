import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'default' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  default: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
};
const variants: Record<ButtonVariant, string> = {
  default: 'bg-emerald-600 text-white hover:bg-emerald-700',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
};

export function Button({ variant = 'default', size = 'default', className = '', children, ...props }: ButtonProps) {
  const cls = .trim();
  return (
    <button className={cls} {...props}>
      {children as ReactNode}
    </button>
  );
}

export default Button;
