import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true, ...rest }: CardProps) {
  return (
    <motion.div
      className={`glass p-5 ${hover ? 'card-hover' : ''} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}

export function StatCard({ icon, label, value, trend, color = 'text-guardian-cyan' }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-guardian-blue/10 to-transparent rounded-full -mr-8 -mt-8" />
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl bg-guardian-elevated ${color}`}>{icon}</div>
        {trend && (
          <span className="text-xs text-guardian-green font-medium">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-mono">{value}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </Card>
  );
}
