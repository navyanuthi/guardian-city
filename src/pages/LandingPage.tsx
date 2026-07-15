import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Activity, MapPin, Zap, Brain, Radio, AlertTriangle,
  Cpu, Eye, Satellite, ArrowRight, Mail, Phone, Map, TrendingUp,
  Users, Building2, Siren, CheckCircle2, ChevronRight,
} from 'lucide-react';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';

const tickerItems = [
  '🔥 Fire detected near Central Park — SL-012',
  '🚑 Ambulance dispatched to MG Road',
  '🚓 Police responding to Riverside zone',
  '⚠️ AI confidence increased to 96% on INC-1042',
  '🌊 Flood risk warning issued for Green Valley',
  '💨 Smoke detected on SL-007 — Investigating',
  '✅ INC-1038 resolved by Harbor Front unit',
  '🌳 Tree collapse reported on Hill Road — SL-019',
];

const features = [
  { icon: Brain, title: 'AI-Powered Detection', desc: 'Every street light uses edge AI to detect emergencies in real-time with 96%+ accuracy.' },
  { icon: Radio, title: 'Mesh Communication', desc: 'Nearby lights form an intelligent mesh network, sharing threat data within milliseconds.' },
  { icon: Siren, title: 'Instant Authority Alerts', desc: 'Detected incidents are routed to the nearest authority unit with optimal dispatch.' },
  { icon: Shield, title: 'Citizen Safety Portal', desc: 'Citizens can trigger SOS, report emergencies, and receive real-time safety alerts.' },
  { icon: Activity, title: 'Live Monitoring', desc: 'Command center with live incident feed, AI confidence scores, and response timelines.' },
  { icon: TrendingUp, title: 'Predictive Analytics', desc: 'Historical data powers crime heatmaps, fire hotspots, and flood risk predictions.' },
];

const workflowSteps = [
  { icon: Eye, title: 'AI Detects Incident', desc: 'Smart light sensors identify anomaly' },
  { icon: Radio, title: 'Lights Communicate', desc: 'Nearby guardians share threat data' },
  { icon: AlertTriangle, title: 'Incident Appears', desc: 'Instant alert in command center' },
  { icon: Siren, title: 'Authority Alerted', desc: 'Nearest unit receives dispatch' },
  { icon: Shield, title: 'Citizen Notified', desc: 'Safety alert sent to nearby citizens' },
  { icon: Zap, title: 'Team Dispatched', desc: 'Response team en route' },
  { icon: Activity, title: 'In Progress', desc: 'Live tracking of response' },
  { icon: CheckCircle2, title: 'Resolved', desc: 'Incident marked resolved' },
  { icon: Map, title: 'Stored in History', desc: 'Analytics and reporting updated' },
];

const stats = [
  { value: 40, label: 'Smart Street Lights', suffix: '' },
  { value: 200, label: 'Incidents Tracked', suffix: '' },
  { value: 96, label: 'AI Accuracy', suffix: '%' },
  { value: 3, label: 'Avg Response (min)', suffix: 'm' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-guardian-bg overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-guardian-bg/70 border-b border-guardian-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-guardian-blue to-guardian-cyan shadow-neon">
              <Shield className="text-white" size={22} />
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">ACGN</p>
              <p className="text-[10px] text-slate-400">GuardianVerse</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#universe" className="hover:text-guardian-cyan transition-colors">Universe</a>
            <a href="#mission" className="hover:text-guardian-cyan transition-colors">Mission</a>
            <a href="#features" className="hover:text-guardian-cyan transition-colors">Features</a>
            <a href="#workflow" className="hover:text-guardian-cyan transition-colors">Workflow</a>
            <a href="#about" className="hover:text-guardian-cyan transition-colors">About</a>
            <a href="#contact" className="hover:text-guardian-cyan transition-colors">Contact</a>
          </div>
          <button
            onClick={() => navigate('/launch')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-guardian-blue to-guardian-cyan text-white text-sm font-semibold shadow-neon hover:shadow-neon-strong transition-all"
          >
            Launch Platform
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-guardian-blue/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-guardian-cyan/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-guardian-cyan to-transparent"
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-guardian-blue/10 border border-guardian-blue/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-guardian-green animate-pulse" />
            <span className="text-xs font-medium text-guardian-cyan">LIVE — Smart City Network Online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            AI Community<br />
            <span className="neon-text">Guardian Network</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Every street light is an intelligent guardian. Powered by edge AI, mesh communication,
            and real-time analytics — building safer cities through collaborative intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/launch')}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-guardian-blue to-guardian-cyan text-white text-base font-bold shadow-neon hover:shadow-neon-strong transition-all flex items-center gap-2"
            >
              Launch Smart City Platform
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl glass text-slate-200 text-base font-semibold hover:border-guardian-blue/50 transition-all flex items-center gap-2"
            >
              Explore Features
              <ChevronRight size={20} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass p-4 text-center">
                <p className="text-3xl font-bold neon-text">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emergency Ticker */}
      <div className="relative z-10 border-y border-guardian-border bg-guardian-surface/50 backdrop-blur-md py-3 overflow-hidden">
        <div className="flex items-center gap-3 px-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 flex-shrink-0">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-xs font-bold text-red-400">LIVE</span>
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              className="flex gap-12 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="text-sm text-slate-300">{item}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Universe Section */}
      <section id="universe" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-guardian-purple/10 border border-guardian-purple/30 mb-6"
          >
            <Satellite size={14} className="text-guardian-purple" />
            <span className="text-xs font-medium text-guardian-purple">GuardianVerse</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            The <span className="neon-text">GuardianVerse</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto"
          >
            In the GuardianVerse, every smart street light is an intelligent guardian that
            collaborates with nearby lights using AI to detect emergencies, protect citizens,
            and coordinate rapid response. Together, they form a living, breathing safety network
            across the entire city.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Cpu, title: 'Edge AI', desc: 'Each guardian processes sensor data locally for zero-latency detection.' },
              { icon: Radio, title: 'Mesh Network', desc: 'Guardians communicate with neighbors to verify and escalate threats.' },
              { icon: Building2, title: 'City-Wide Coverage', desc: '40 guardians monitor every zone, forming a complete safety grid.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 card-hover text-left"
              >
                <div className="p-3 rounded-xl bg-guardian-elevated text-guardian-cyan mb-4 w-fit">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 px-6 bg-guardian-surface/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-guardian-green/10 border border-guardian-green/30 mb-6">
                <Shield size={14} className="text-guardian-green" />
                <span className="text-xs font-medium text-guardian-green">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Building <span className="neon-text">Safer Cities</span><br />
                Through AI Guardians
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-6">
                Our mission is to build safer cities using AI-powered smart street lights that
                detect incidents, communicate with nearby lights, notify authorities instantly,
                and assist citizens through real-time emergency response.
              </p>
              <p className="text-base text-slate-500 leading-relaxed">
                From fire detection to woman safety alerts, from flood warnings to medical
                emergencies — the Guardian Network ensures no incident goes unnoticed and
                no citizen is left unprotected.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Siren, label: 'Emergency Response', value: '< 3 min' },
                { icon: Brain, label: 'AI Accuracy', value: '96%' },
                { icon: Users, label: 'Citizens Protected', value: '100+' },
                { icon: MapPin, label: 'Zones Covered', value: '8' },
              ].map((item, i) => (
                <div key={i} className="glass p-6 text-center">
                  <item.icon size={28} className="text-guardian-cyan mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white font-mono">{item.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Platform <span className="neon-text">Features</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A comprehensive smart city safety ecosystem powered by AI, IoT, and real-time analytics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass p-6 card-hover"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-guardian-blue/20 to-guardian-cyan/10 text-guardian-cyan mb-4 w-fit">
                  <f.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Workflow */}
      <section id="workflow" className="py-24 px-6 bg-guardian-surface/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Emergency <span className="neon-text">Workflow</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From detection to resolution — the complete AI-driven emergency response pipeline.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-2">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 w-full max-w-2xl"
              >
                <div className="flex items-center gap-4 glass p-4 flex-1 card-hover">
                  <div className="p-3 rounded-xl bg-guardian-elevated text-guardian-cyan">
                    <step.icon size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{step.title}</p>
                    <p className="text-xs text-slate-400">{step.desc}</p>
                  </div>
                  <span className="ml-auto text-2xl font-bold text-guardian-blue/30 font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {i < workflowSteps.length - 1 && (
                  <ChevronRight size={20} className="text-guardian-blue/40 rotate-90" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About <span className="neon-text">ACGN</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 leading-relaxed mb-12"
          >
            The AI Community Guardian Network is an Ideathon / Stellar Hack project envisioning the
            future of urban safety. By transforming ordinary street lights into intelligent, collaborative
            AI guardians, ACGN creates a city-wide safety mesh that detects, communicates, and responds
            to emergencies faster than any traditional system. This is a frontend demonstration with
            realistic simulated data — showcasing what a real Smart City Command & Control Center
            would look like in production.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, label: 'Smart City' },
              { icon: Brain, label: 'AI Powered' },
              { icon: Radio, label: 'Mesh Network' },
              { icon: Shield, label: 'Citizen Safety' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 text-center card-hover"
              >
                <item.icon size={28} className="text-guardian-cyan mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-300">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-guardian-surface/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in <span className="neon-text">Touch</span>
            </h2>
            <p className="text-lg text-slate-400">Have questions about the Guardian Network? Reach out.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-guardian-elevated text-guardian-cyan">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="text-sm text-white">contact@acgn.guardianverse</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-guardian-elevated text-guardian-cyan">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Emergency Hotline</p>
                  <p className="text-sm text-white">+91 112 233 4455</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <input
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-guardian-surface border border-guardian-border text-white placeholder-slate-500 outline-none focus:border-guardian-blue/50 transition-colors"
              />
              <input
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-guardian-surface border border-guardian-border text-white placeholder-slate-500 outline-none focus:border-guardian-blue/50 transition-colors"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-guardian-surface border border-guardian-border text-white placeholder-slate-500 outline-none focus:border-guardian-blue/50 transition-colors resize-none"
              />
              <button
                onClick={() => navigate('/launch')}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-guardian-blue to-guardian-cyan text-white font-bold shadow-neon hover:shadow-neon-strong transition-all flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-guardian-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-guardian-blue to-guardian-cyan">
                  <Shield className="text-white" size={18} />
                </div>
                <p className="font-bold text-white">ACGN</p>
              </div>
              <p className="text-sm text-slate-400">
                AI Community Guardian Network — building safer cities through intelligent street lights.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Platform</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-guardian-cyan">Features</a></li>
                <li><a href="#workflow" className="hover:text-guardian-cyan">Workflow</a></li>
                <li><button onClick={() => navigate('/launch')} className="hover:text-guardian-cyan">Launch Portal</button></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Resources</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#universe" className="hover:text-guardian-cyan">GuardianVerse</a></li>
                <li><a href="#mission" className="hover:text-guardian-cyan">Mission</a></li>
                <li><a href="#about" className="hover:text-guardian-cyan">About</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Connect</p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#contact" className="hover:text-guardian-cyan">Contact</a></li>
                <li className="text-slate-500">Ideathon / Stellar Hack</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-guardian-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">© 2026 ACGN — GuardianVerse. All rights reserved.</p>
            <p className="text-xs text-slate-500">Frontend Demo · Simulated Data · No Backend Required</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
