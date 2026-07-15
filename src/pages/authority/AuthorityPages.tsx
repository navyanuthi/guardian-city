import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Map, Brain, Siren, Clock, Radio, Activity,
  BarChart3, FileText, History, Settings, Search, Filter,
  CheckCircle2, Zap, AlertTriangle, Users,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card, StatCard, Button, Badge, Modal, useToast } from '../../components/ui';
import { CityMap } from '../../components/CityMap';
import {
  MonthlyTrendsChart, WeeklyTrendsChart, IncidentCategoryChart,
  ResponseTimeChart, FireFloodChart, AiPerformanceChart,
  CrimeHeatmapChart, ResponseEfficiencyChart,
} from '../../components/Charts';
import {
  incidents, reports, activityLogs,
} from '../../data/mockData';
import type { Incident, Role } from '../../types';

const navItems = [
  { to: '/authority', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/authority/incidents', label: 'Live Incidents', icon: <Siren size={18} /> },
  { to: '/authority/map', label: 'City Map', icon: <Map size={18} /> },
  { to: '/authority/ai', label: 'AI Detection', icon: <Brain size={18} /> },
  { to: '/authority/dispatch', label: 'Dispatch', icon: <Radio size={18} /> },
  { to: '/authority/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { to: '/authority/reports', label: 'Citizen Reports', icon: <FileText size={18} /> },
  { to: '/authority/activity', label: 'Activity', icon: <Activity size={18} /> },
  { to: '/authority/history', label: 'Incident History', icon: <History size={18} /> },
  { to: '/authority/settings', label: 'Settings', icon: <Settings size={18} /> },
];

const role: Role = 'authority';

function severityVariant(sev: string) {
  return sev === 'Critical' ? 'danger' : sev === 'High' ? 'warning' : sev === 'Medium' ? 'info' : 'success';
}

function statusVariant(status: string) {
  if (status === 'Resolved') return 'success';
  if (status === 'In Progress') return 'info';
  if (status === 'Dispatched') return 'warning';
  if (status === 'Accepted') return 'purple';
  return 'danger';
}

export function AuthorityDashboard() {
  const { toast } = useToast();
  const [liveIncidents] = useState(incidents.slice(0, 6));
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = incidents[Math.floor(Math.random() * incidents.length)];
      toast(`New incident: ${random.type} at ${random.streetLightId}`, 'warning', '⚠️');
    }, 12000);
    return () => clearInterval(interval);
  }, [toast]);

  return (
    <DashboardLayout role={role} navItems={navItems} title="Command Center" subtitle="Live Smart City monitoring">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Siren size={20} />} label="Active Incidents" value={liveIncidents.length} trend="Live" color="text-red-400" />
        <StatCard icon={<CheckCircle2 size={20} />} label="Resolved Today" value="24" color="text-guardian-green" />
        <StatCard icon={<Clock size={20} />} label="Avg Response" value="4.2m" color="text-guardian-yellow" />
        <StatCard icon={<Brain size={20} />} label="AI Accuracy" value="96%" color="text-guardian-cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Live Incident Feed</h3>
              <Badge variant="danger" size="sm"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block mr-1" />LIVE</Badge>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {liveIncidents.map((inc, i) => (
                <motion.div
                  key={inc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedIncident(inc)}
                  className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface hover:bg-guardian-elevated cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{incidentEmoji(inc.type)}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{inc.type}</p>
                      <p className="text-xs text-slate-400">{inc.streetLightId} · {inc.zone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={severityVariant(inc.severity)} size="sm">{inc.severity}</Badge>
                    <Badge variant={statusVariant(inc.status)} size="sm">{inc.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4">City Map — Active Incidents</h3>
            <CityMap height="350px" />
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-white mb-3">AI Detection Panel</h3>
            <div className="space-y-2">
              {liveIncidents.slice(0, 4).map((inc) => (
                <div key={inc.id} className="p-3 rounded-xl bg-guardian-surface">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white">{inc.type}</span>
                    <span className="text-xs font-mono text-guardian-cyan">{inc.confidence}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-guardian-bg overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-guardian-blue to-guardian-cyan"
                      initial={{ width: 0 }}
                      animate={{ width: `${inc.confidence}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="text-xs">
                  <span className="text-slate-300">{log.user}</span>
                  <span className="text-slate-500"> {log.action} </span>
                  <span className="text-guardian-cyan">{log.target}</span>
                  <p className="text-slate-600">{log.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <IncidentModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
    </DashboardLayout>
  );
}

function incidentEmoji(type: string): string {
  const map: Record<string, string> = {
    Fire: '🔥', 'Road Accident': '🚗', Theft: '🦹', 'Suspicious Activity': '👁',
    'Woman Safety Alert': '👩', 'Medical Emergency': '🚑', Flood: '🌊', 'Gas Leak': '💨',
    'Traffic Congestion': '🚦', 'Tree Collapse': '🌳', 'Electric Pole Failure': '⚡', 'Animal on Road': '🐕',
  };
  return map[type] || '⚠️';
}

function IncidentModal({ incident, onClose }: { incident: Incident | null; onClose: () => void }) {
  const { toast } = useToast();
  if (!incident) return null;
  return (
    <Modal open={!!incident} onClose={onClose} title={`${incidentEmoji(incident.type)} ${incident.type}`} size="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{incident.id}</span>
          <div className="flex gap-2">
            <Badge variant={severityVariant(incident.severity)}>{incident.severity}</Badge>
            <Badge variant={statusVariant(incident.status)}>{incident.status}</Badge>
          </div>
        </div>
        <p className="text-sm text-slate-300">{incident.description}</p>
        <div className="grid grid-cols-2 gap-3">
          <InfoRow label="AI Confidence" value={`${incident.confidence}%`} />
          <InfoRow label="Street Light" value={incident.streetLightId} />
          <InfoRow label="Detected At" value={new Date(incident.detectedAt).toLocaleString()} />
          <InfoRow label="Zone" value={incident.zone} />
          <InfoRow label="Nearest Authority" value={incident.nearestAuthority} />
          <InfoRow label="Est. Response" value={`${incident.estimatedResponseMin} min`} />
        </div>
        <div className="p-3 rounded-xl bg-guardian-surface">
          <p className="text-xs text-slate-400 mb-1">Recommended Action</p>
          <p className="text-sm text-white">{incident.recommendedAction}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <Button size="sm" variant="success" icon={<CheckCircle2 size={14} />} onClick={() => toast('Incident accepted', 'success', '✅')}>Accept</Button>
          <Button size="sm" variant="primary" icon={<Radio size={14} />} onClick={() => toast('Team dispatched', 'info', '🚓')}>Dispatch</Button>
          <Button size="sm" variant="secondary" icon={<Zap size={14} />} onClick={() => toast('Marked in progress', 'warning', '⚡')}>In Progress</Button>
          <Button size="sm" variant="secondary" icon={<CheckCircle2 size={14} />} onClick={() => { toast('Incident resolved', 'success', '✅'); onClose(); }}>Resolve</Button>
        </div>
      </div>
    </Modal>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-guardian-surface">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export function AuthorityIncidents() {
  const [selected, setSelected] = useState<Incident | null>(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = incidents.filter(
    (i) =>
      (filter === 'All' || i.status === filter) &&
      (search === '' || i.type.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase()))
  ).slice(0, 20);

  return (
    <DashboardLayout role={role} navItems={navItems} title="Live Incident Feed" subtitle="Real-time incident monitoring">
      <Card hover={false}>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-guardian-surface border border-guardian-border flex-1">
            <Search size={16} className="text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search incidents..."
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-guardian-surface border border-guardian-border text-white text-sm outline-none"
            >
              {['All', 'Detected', 'Accepted', 'Dispatched', 'In Progress', 'Resolved'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filtered.map((inc, i) => (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setSelected(inc)}
              className="flex items-center justify-between p-4 rounded-xl bg-guardian-surface hover:bg-guardian-elevated cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{incidentEmoji(inc.type)}</span>
                <div>
                  <p className="text-sm font-medium text-white">{inc.type}</p>
                  <p className="text-xs text-slate-400">{inc.id} · {inc.streetLightId} · {inc.zone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-guardian-cyan">{inc.confidence}%</span>
                <Badge variant={severityVariant(inc.severity)} size="sm">{inc.severity}</Badge>
                <Badge variant={statusVariant(inc.status)} size="sm">{inc.status}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
      <IncidentModal incident={selected} onClose={() => setSelected(null)} />
    </DashboardLayout>
  );
}

export function AuthorityMap() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Interactive City Map" subtitle="All incidents and resources">
      <Card>
        <CityMap height="650px" />
      </Card>
    </DashboardLayout>
  );
}

export function AuthorityAI() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="AI Detection Panel" subtitle="Real-time AI confidence and detection">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Active AI Detections</h3>
          <div className="space-y-3">
            {incidents.slice(0, 8).map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-guardian-surface"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{incidentEmoji(inc.type)}</span>
                    <span className="text-sm font-medium text-white">{inc.type}</span>
                  </div>
                  <span className="text-sm font-mono text-guardian-cyan">{inc.confidence}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-guardian-bg overflow-hidden">
                  <motion.div
                    className={`h-full ${inc.confidence > 90 ? 'bg-guardian-green' : inc.confidence > 85 ? 'bg-guardian-cyan' : 'bg-guardian-yellow'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${inc.confidence}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{inc.streetLightId} · {inc.zone}</p>
              </motion.div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">AI Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Detection Accuracy', value: 96, color: 'from-guardian-green to-emerald-500' },
              { label: 'False Positive Rate', value: 4, color: 'from-guardian-yellow to-orange-500' },
              { label: 'Processing Latency', value: 87, color: 'from-guardian-cyan to-guardian-blue' },
              { label: 'Mesh Sync Rate', value: 99, color: 'from-guardian-blue to-blue-600' },
              { label: 'Sensor Coverage', value: 94, color: 'from-guardian-purple to-blue-500' },
            ].map((m, i) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{m.label}</span>
                  <span className="text-xs font-mono text-white">{m.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-guardian-bg overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${m.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export function AuthorityDispatch() {
  const { toast } = useToast();
  const activeIncidents = incidents.filter((i) => i.status !== 'Resolved').slice(0, 8);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Dispatch Panel" subtitle="Coordinate response teams">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Pending Dispatch</h3>
          <div className="space-y-3">
            {activeIncidents.map((inc, i) => (
              <motion.div
                key={inc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-guardian-surface"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{incidentEmoji(inc.type)}</span>
                    <span className="text-sm font-medium text-white">{inc.type}</span>
                  </div>
                  <Badge variant={severityVariant(inc.severity)} size="sm">{inc.severity}</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{inc.streetLightId} · {inc.zone} · ETA {inc.estimatedResponseMin}min</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" icon={<Radio size={14} />} onClick={() => toast(`Team dispatched to ${inc.id}`, 'info', '🚓')}>Dispatch Team</Button>
                  <Button size="sm" variant="secondary" icon={<CheckCircle2 size={14} />} onClick={() => toast('Incident accepted', 'success', '✅')}>Accept</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Response Timeline</h3>
          <div className="space-y-4">
            {[
              { step: 'AI Detected', time: '12:04:32', icon: Brain, color: 'text-guardian-cyan' },
              { step: 'Mesh Notified', time: '12:04:33', icon: Radio, color: 'text-guardian-blue' },
              { step: 'Authority Alerted', time: '12:04:35', icon: AlertTriangle, color: 'text-guardian-yellow' },
              { step: 'Team Dispatched', time: '12:05:10', icon: Zap, color: 'text-orange-400' },
              { step: 'In Progress', time: '12:08:45', icon: Activity, color: 'text-guardian-purple' },
              { step: 'Resolved', time: '12:15:20', icon: CheckCircle2, color: 'text-guardian-green' },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className={`p-2 rounded-xl bg-guardian-surface ${t.color}`}>
                  <t.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{t.step}</p>
                  <p className="text-xs text-slate-500 font-mono">{t.time}</p>
                </div>
                {i < 5 && <div className="w-px h-6 bg-guardian-border absolute ml-[18px] mt-10" />}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export function AuthorityAnalytics() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Analytics" subtitle="City-wide incident analytics">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrendsChart />
        <WeeklyTrendsChart />
        <IncidentCategoryChart />
        <ResponseTimeChart />
        <FireFloodChart />
        <AiPerformanceChart />
        <CrimeHeatmapChart />
        <ResponseEfficiencyChart />
      </div>
    </DashboardLayout>
  );
}

export function AuthorityReports() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Citizen Reports" subtitle="Reports submitted by citizens">
      <Card hover={false}>
        <div className="space-y-2">
          {reports.slice(0, 20).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface hover:bg-guardian-elevated transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{incidentEmoji(r.type)}</span>
                <div>
                  <p className="text-sm font-medium text-white">{r.type}</p>
                  <p className="text-xs text-slate-400">{r.id} · {r.citizenName} · {r.zone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {r.photo && <span>📷</span>}
                {r.video && <span>🎥</span>}
                {r.voice && <span>🎤</span>}
                <Badge variant={r.status === 'Resolved' ? 'success' : r.status === 'Reviewing' ? 'warning' : 'info'}>
                  {r.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AuthorityActivity() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Recent Activity" subtitle="System-wide activity log">
      <Card hover={false}>
        <div className="space-y-2">
          {activityLogs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${log.role === 'authority' ? 'bg-guardian-blue/10 text-guardian-cyan' : log.role === 'admin' ? 'bg-guardian-purple/10 text-guardian-purple' : 'bg-guardian-green/10 text-guardian-green'}`}>
                  <Users size={14} />
                </div>
                <div>
                  <p className="text-sm text-white">
                    <span className="font-medium">{log.user}</span>
                    <span className="text-slate-400"> {log.action} </span>
                    <span className="text-guardian-cyan">{log.target}</span>
                  </p>
                  <p className="text-xs text-slate-500">{log.time}</p>
                </div>
              </div>
              <Badge variant="info" size="sm">{log.role}</Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AuthorityHistory() {
  const resolved = incidents.filter((i) => i.status === 'Resolved').slice(0, 20);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Incident History" subtitle="Resolved incidents archive">
      <Card hover={false}>
        <div className="space-y-2">
          {resolved.map((inc, i) => (
            <motion.div
              key={inc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{incidentEmoji(inc.type)}</span>
                <div>
                  <p className="text-sm font-medium text-white">{inc.type}</p>
                  <p className="text-xs text-slate-400">{inc.id} · {inc.streetLightId} · {new Date(inc.detectedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-guardian-cyan">{inc.confidence}%</span>
                <Badge variant="success" size="sm">Resolved</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AuthoritySettings() {
  const { toast } = useToast();
  return (
    <DashboardLayout role={role} navItems={navItems} title="Settings" subtitle="Authority preferences">
      <Card>
        <h3 className="text-sm font-semibold text-white mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          {['Critical Alerts', 'High Severity', 'AI Detection Updates', 'Dispatch Notifications', 'Citizen Reports'].map((s) => (
            <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface">
              <span className="text-sm text-white">{s}</span>
              <button onClick={() => toast('Setting updated', 'success', '✅')} className="w-11 h-6 rounded-full bg-guardian-blue relative">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
