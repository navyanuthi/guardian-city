import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-guardian-blue to-guardian-cyan text-white shadow-neon hover:shadow-neon-strong',
  secondary: 'bg-guardian-elevated text-slate-200 border border-guardian-border hover:border-guardian-blue/50',
  ghost: 'bg-transparent text-slate-300 hover:bg-guardian-elevated hover:text-guardian-cyan',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-neon-red hover:shadow-neon-red',
  success: 'bg-gradient-to-r from-guardian-green to-emerald-500 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </motion.button>
  );
}
