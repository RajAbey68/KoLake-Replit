import React, { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'default' | 'destructive' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-900 text-white',
  destructive: 'bg-red-600 text-white',
  outline: 'border border-current text-current',
};

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const cls = .trim();
  return (
    <span className={cls} {...props}>
      {children as ReactNode}
    </span>
  );
}

export default Badge;
