import { type ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, Search, Shield, ChevronDown } from 'lucide-react';
import { notifications } from '../data/mockData';
import type { Role } from '../types';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  role: Role;
  navItems: NavItem[];
  children: ReactNode;
  title: string;
  subtitle: string;
}

const roleConfig: Record<Role, { color: string; label: string; icon: string }> = {
  citizen: { color: 'text-guardian-cyan', label: 'Citizen Portal', icon: '👤' },
  authority: { color: 'text-guardian-blue', label: 'Authority Portal', icon: '🚓' },
  admin: { color: 'text-guardian-purple', label: 'Super Admin', icon: '🛡' },
};

export function DashboardLayout({ role, navItems, children, title, subtitle }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const cfg = roleConfig[role];
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex bg-guardian-bg">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass-elevated border-r border-guardian-border z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-guardian-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-guardian-blue to-guardian-cyan shadow-neon">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">ACGN</p>
              <p className="text-xs text-slate-400">{cfg.label}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-guardian-border">
          <NavLink to="/" className="sidebar-link">
            <span className="text-lg">←</span>
            <span>Exit to Landing</span>
          </NavLink>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 glass-elevated border-b border-guardian-border px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-guardian-surface"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
              <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-guardian-surface border border-guardian-border">
              <Search size={16} className="text-slate-500" />
              <input
                placeholder="Search..."
                className="bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none w-48"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl bg-guardian-surface border border-guardian-border text-slate-300 hover:text-guardian-cyan hover:border-guardian-blue/50 transition-colors"
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 glass-elevated border border-guardian-border rounded-xl shadow-neon z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-3 border-b border-guardian-border flex items-center justify-between">
                        <p className="font-semibold text-white text-sm">Notifications</p>
                        <span className="text-xs text-slate-400">{unread} unread</span>
                      </div>
                      <div className="divide-y divide-guardian-border">
                        {notifications.slice(0, 6).map((n) => (
                          <div
                            key={n.id}
                            className={`p-3 hover:bg-guardian-surface transition-colors cursor-pointer ${
                              !n.read ? 'bg-guardian-blue/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{n.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white">{n.title}</p>
                                <p className="text-xs text-slate-400 truncate">{n.message}</p>
                                <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                              </div>
                              {!n.read && <span className="w-2 h-2 rounded-full bg-guardian-cyan mt-1.5" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <div className={`p-2 rounded-xl bg-guardian-elevated ${cfg.color}`}>
                <span className="text-sm font-bold">{cfg.icon}</span>
              </div>
              <ChevronDown size={16} className="text-slate-500 hidden md:block" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
