import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '../components/ui';

const roles = [
  {
    id: 'citizen',
    title: 'Citizen Portal',
    icon: User,
    desc: 'Report emergencies, view nearby resources, and receive real-time safety alerts.',
    color: 'from-guardian-cyan to-guardian-blue',
    accent: 'text-guardian-cyan',
    path: '/citizen',
  },
  {
    id: 'authority',
    title: 'Authority Portal',
    icon: Shield,
    desc: 'Monitor live incidents, dispatch response teams, and manage city-wide emergencies.',
    color: 'from-guardian-blue to-blue-600',
    accent: 'text-guardian-blue',
    path: '/authority',
  },
  {
    id: 'admin',
    title: 'Super Admin',
    icon: ShieldCheck,
    desc: 'Full system control — manage citizens, authorities, sensors, and AI performance.',
    color: 'from-guardian-purple to-blue-500',
    accent: 'text-guardian-purple',
    path: '/admin',
  },
];

export function RoleSelection() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = (path: string) => {
    setAuthenticating(true);
    setTimeout(() => {
      setAuthenticating(false);
      toast('Authentication successful', 'success', '✅');
      navigate(path);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-guardian-bg flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-guardian-blue/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-guardian-cyan mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your <span className="neon-text">Portal</span>
          </h1>
          <p className="text-lg text-slate-400">Choose a role to access the Smart City platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
              className={`glass p-8 cursor-pointer transition-all duration-300 ${
                selectedRole === role.id ? 'border-guardian-blue/50 shadow-neon' : 'card-hover'
              }`}
            >
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${role.color} w-fit mb-6 shadow-neon`}>
                <role.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{role.desc}</p>

              {selectedRole === role.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3"
                >
                  <input
                    placeholder="Email"
                    className="w-full px-4 py-2.5 rounded-xl bg-guardian-surface border border-guardian-border text-white text-sm placeholder-slate-500 outline-none focus:border-guardian-blue/50 transition-colors"
                    defaultValue={`${role.id}@acgn.demo`}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-xl bg-guardian-surface border border-guardian-border text-white text-sm placeholder-slate-500 outline-none focus:border-guardian-blue/50 transition-colors"
                    defaultValue="demo1234"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogin(role.path);
                    }}
                    disabled={authenticating}
                    className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-guardian-blue to-guardian-cyan text-white text-sm font-bold shadow-neon hover:shadow-neon-strong transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {authenticating ? (
                      <><Loader2 size={16} className="animate-spin" /> Authenticating...</>
                    ) : (
                      <>Enter Portal <ArrowRight size={16} /></>
                    )}
                  </button>
                </motion.div>
              )}

              {selectedRole !== role.id && (
                <p className={`text-sm font-medium ${role.accent} flex items-center gap-1`}>
                  Click to login <ArrowRight size={14} />
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
