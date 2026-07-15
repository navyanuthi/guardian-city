interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

const variants = {
  default: 'bg-slate-700/50 text-slate-300 border-slate-600/50',
  success: 'bg-guardian-green/15 text-guardian-green border-guardian-green/30',
  warning: 'bg-guardian-yellow/15 text-guardian-yellow border-guardian-yellow/30',
  danger: 'bg-red-500/15 text-red-400 border-red-500/30',
  info: 'bg-guardian-blue/15 text-guardian-cyan border-guardian-blue/30',
  purple: 'bg-guardian-purple/15 text-guardian-purple border-guardian-purple/30',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${
        variants[variant]
      } ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
    >
      {children}
    </span>
  );
}
