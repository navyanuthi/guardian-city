import { motion } from 'framer-motion';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-guardian-elevated/60 ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-12 h-4 rounded-full" />
      </div>
      <Skeleton className="w-24 h-7" />
      <Skeleton className="w-32 h-4" />
    </motion.div>
  );
}
