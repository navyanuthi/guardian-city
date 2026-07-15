import { type ReactNode, createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'alert';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  icon?: ReactNode;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, icon?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const typeStyles: Record<ToastType, string> = {
  success: 'border-guardian-green/40 bg-guardian-green/10 text-guardian-green',
  error: 'border-red-500/40 bg-red-500/10 text-red-400',
  info: 'border-guardian-blue/40 bg-guardian-blue/10 text-guardian-cyan',
  warning: 'border-guardian-yellow/40 bg-guardian-yellow/10 text-guardian-yellow',
  alert: 'border-red-500/40 bg-red-500/10 text-red-400',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info', icon?: ReactNode) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`glass-elevated border px-4 py-3 rounded-xl shadow-neon flex items-center gap-3 min-w-[280px] max-w-sm pointer-events-auto ${typeStyles[t.type]}`}
            >
              {t.icon && <span className="text-lg">{t.icon}</span>}
              <p className="text-sm font-medium text-white flex-1">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
