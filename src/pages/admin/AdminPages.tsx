import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Shield, Lightbulb, Activity, BarChart3,
  FileText, Brain, Bell, Settings, Search, Server, Cpu as CpuIcon,
  CheckCircle2, AlertTriangle, Lightbulb as LightIcon,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card, StatCard, Badge, Modal, useToast } from '../../components/ui';
import { CityMap } from '../../components/CityMap';
import {
  MonthlyTrendsChart, WeeklyTrendsChart, IncidentCategoryChart,
  AiPerformanceChart, ResponseTimeChart, FireFloodChart,
} from '../../components/Charts';
import {
  citizens, authorities, streetLights, incidents, reports,
  activityLogs, notifications,
} from '../../data/mockData';
import type { StreetLight, Role } from '../../types';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/admin/citizens', label: 'Citizens', icon: <Users size={18} /> },
  { to: '/admin/authorities', label: 'Authorities', icon: <Shield size={18} /> },
  { to: '/admin/lights', label: 'Street Lights', icon: <Lightbulb size={18} /> },
  { to: '/admin/sensors', label: 'Sensor Health', icon: <Activity size={18} /> },
  { to: '/admin/incidents', label: 'Incident Logs', icon: <FileText size={18} /> },
  { to: '/admin/analytics', label: 'Analytics', icon: <BarChart3 size={18} /> },
  { to: '/admin/reports', label: 'Reports', icon: <FileText size={18} /> },
  { to: '/admin/system', label: 'System Status', icon: <Server size={18} /> },
  { to: '/admin/ai', label: 'AI Performance', icon: <Brain size={18} /> },
  { to: '/admin/notifications', label: 'Notifications', icon: <Bell size={18} /> },
  { to: '/admin/settings', label: 'Settings', icon: <Settings size={18} /> },
];

const role: Role = 'admin';

export function AdminDashboard() {
  const onlineLights = streetLights.filter((l) => l.status === 'Normal').length;
  const warningLights = streetLights.filter((l) => l.status === 'Warning').length;
  const emergencyLights = streetLights.filter((l) => l.status === 'Emergency').length;

  return (
    <DashboardLayout role={role} navItems={navItems} title="Admin Console" subtitle="System-wide overview">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users size={20} />} label="Total Citizens" value={citizens.length} color="text-guardian-cyan" />
        <StatCard icon={<Shield size={20} />} label="Authorities" value={authorities.length} color="text-guardian-blue" />
        <StatCard icon={<Lightbulb size={20} />} label="Street Lights" value={streetLights.length} color="text-guardian-green" />
        <StatCard icon={<FileText size={20} />} label="Incident Logs" value={incidents.length} color="text-guardian-yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Light Status Distribution</h3>
          <div className="space-y-3">
            <StatusRow label="Normal" count={onlineLights} total={40} color="bg-guardian-green" />
            <StatusRow label="Warning" count={warningLights} total={40} color="bg-guardian-yellow" />
            <StatusRow label="Emergency" count={emergencyLights} total={40} color="bg-red-500" />
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-3">
            {[
              { label: 'AI Engine', value: 96, color: 'text-guardian-green' },
              { label: 'Sensor Network', value: 94, color: 'text-guardian-cyan' },
              { label: 'Mesh Communication', value: 99, color: 'text-guardian-blue' },
              { label: 'Data Pipeline', value: 92, color: 'text-guardian-yellow' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{s.label}</span>
                  <span className={`text-xs font-mono ${s.color}`}>{s.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-guardian-bg overflow-hidden">
                  <motion.div
                    className={`h-full ${s.color.replace('text-', 'bg-')}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Activity Logs</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {activityLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="text-xs">
                <span className="text-slate-300">{log.user}</span>
                <span className="text-slate-500"> {log.action} </span>
                <span className="text-guardian-cyan">{log.target}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-white mb-4">City-Wide Guardian Map</h3>
        <CityMap height="400px" />
      </Card>
    </DashboardLayout>
  );
}

function StatusRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-mono text-white">{count}/{total}</span>
      </div>
      <div className="w-full h-2 rounded-full bg-guardian-bg overflow-hidden">
        <motion.div className={`h-full ${color}`} initial={{ width: 0 }} animate={{ width: `${(count / total) * 100}%` }} transition={{ duration: 1 }} />
      </div>
    </div>
  );
}

export function AdminCitizens() {
  const [search, setSearch] = useState('');
  const filtered = citizens.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())).slice(0, 25);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Manage Citizens" subtitle={`${citizens.length} registered citizens`}>
      <Card hover={false}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-guardian-surface border border-guardian-border mb-4">
          <Search size={16} className="text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search citizens..." className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-guardian-border">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3 hidden md:table-cell">Zone</th>
                <th className="text-left p-3 hidden md:table-cell">Reports</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-guardian-border/50 hover:bg-guardian-surface transition-colors"
                >
                  <td className="p-3 font-mono text-xs text-slate-400">{c.id}</td>
                  <td className="p-3 text-white">{c.name}</td>
                  <td className="p-3 text-slate-400 hidden md:table-cell">{c.zone}</td>
                  <td className="p-3 text-slate-400 hidden md:table-cell">{c.reports}</td>
                  <td className="p-3"><Badge variant={c.status === 'Active' ? 'success' : 'default'} size="sm">{c.status}</Badge></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AdminAuthorities() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Manage Authorities" subtitle={`${authorities.length} authority personnel`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authorities.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-guardian-blue to-guardian-cyan flex items-center justify-center font-bold text-white">
                  {a.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{a.name}</p>
                  <p className="text-xs text-slate-400">{a.id}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between"><span className="text-slate-400">Role</span><span className="text-white">{a.role}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Zone</span><span className="text-white">{a.zone}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Active</span><span className="text-white">{a.activeIncidents}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Resolved</span><span className="text-guardian-green">{a.resolvedIncidents}</span></div>
              </div>
              <div className="mt-3"><Badge variant={a.status === 'On Duty' ? 'success' : a.status === 'Responding' ? 'warning' : 'default'} size="sm">{a.status}</Badge></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function AdminLights() {
  const [selected, setSelected] = useState<StreetLight | null>(null);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Manage Smart Street Lights" subtitle={`${streetLights.length} guardians deployed`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {streetLights.map((light, i) => (
          <motion.div key={light.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Card className="cursor-pointer" onClick={() => setSelected(light)}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">{light.id}</span>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  light.status === 'Normal' ? 'bg-guardian-green' : light.status === 'Warning' ? 'bg-guardian-yellow' : 'bg-red-500'
                } animate-pulse`} />
              </div>
              <p className="text-sm font-medium text-white mb-2">{light.name}</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="text-slate-400">Battery: <span className="text-white font-mono">{light.battery}%</span></div>
                <div className="text-slate-400">AI: <span className="text-white font-mono">{light.aiHealth}%</span></div>
                <div className="text-slate-400">Net: <span className={light.internet === 'Online' ? 'text-guardian-green' : 'text-red-400'}>{light.internet}</span></div>
                <div className="text-slate-400">Solar: <span className="text-white">{light.solarPanel}</span></div>
              </div>
              <div className="mt-2"><Badge variant={light.status === 'Normal' ? 'success' : light.status === 'Warning' ? 'warning' : 'danger'} size="sm">{light.status}</Badge></div>
            </Card>
          </motion.div>
        ))}
      </div>
      <LightModal light={selected} onClose={() => setSelected(null)} />
    </DashboardLayout>
  );
}

function LightModal({ light, onClose }: { light: StreetLight | null; onClose: () => void }) {
  if (!light) return null;
  return (
    <Modal open={!!light} onClose={onClose} title={light.name} size="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">{light.id}</span>
          <Badge variant={light.status === 'Normal' ? 'success' : light.status === 'Warning' ? 'warning' : 'danger'}>{light.status}</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Zone', value: light.zone },
            { label: 'Battery', value: `${light.battery}%` },
            { label: 'AI Health', value: `${light.aiHealth}%` },
            { label: 'Internet', value: light.internet },
            { label: 'Solar Panel', value: light.solarPanel },
            { label: 'Temperature', value: `${light.temperatureSensor}°C` },
            { label: 'Air Quality', value: `${light.airQuality} AQI` },
            { label: 'Water Level', value: `${light.waterLevelSensor}m` },
            { label: 'Last Maintenance', value: new Date(light.lastMaintenance).toLocaleDateString() },
          ].map((d) => (
            <div key={d.label} className="p-3 rounded-xl bg-guardian-surface">
              <p className="text-xs text-slate-400">{d.label}</p>
              <p className="text-sm font-medium text-white">{d.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {light.camera && <Badge variant="info">Camera</Badge>}
          {light.motionSensor && <Badge variant="info">Motion Sensor</Badge>}
          {light.smokeSensor && <Badge variant="info">Smoke Sensor</Badge>}
          {light.emergencyButton && <Badge variant="info">Emergency Button</Badge>}
          {light.speaker && <Badge variant="info">Speaker</Badge>}
        </div>
      </div>
    </Modal>
  );
}

export function AdminSensors() {
  const sensorData = streetLights.map((l) => ({
    id: l.id,
    camera: l.camera,
    motion: l.motionSensor,
    smoke: l.smokeSensor,
    temp: l.temperatureSensor,
    water: l.waterLevelSensor,
    air: l.airQuality,
    battery: l.battery,
    ai: l.aiHealth,
  }));
  return (
    <DashboardLayout role={role} navItems={navItems} title="Sensor Health" subtitle="Real-time sensor diagnostics">
      <Card hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-guardian-border">
                <th className="text-left p-3">Light ID</th>
                <th className="text-center p-3">Camera</th>
                <th className="text-center p-3">Motion</th>
                <th className="text-center p-3">Smoke</th>
                <th className="text-center p-3 hidden md:table-cell">Temp</th>
                <th className="text-center p-3 hidden md:table-cell">Water</th>
                <th className="text-center p-3 hidden md:table-cell">Air</th>
                <th className="text-center p-3">Battery</th>
                <th className="text-center p-3">AI</th>
              </tr>
            </thead>
            <tbody>
              {sensorData.slice(0, 20).map((s, i) => (
                <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b border-guardian-border/50 hover:bg-guardian-surface">
                  <td className="p-3 font-mono text-xs text-slate-400">{s.id}</td>
                  <td className="p-3 text-center">{s.camera ? <CheckCircle2 size={14} className="text-guardian-green mx-auto" /> : <AlertTriangle size={14} className="text-red-400 mx-auto" />}</td>
                  <td className="p-3 text-center">{s.motion ? <CheckCircle2 size={14} className="text-guardian-green mx-auto" /> : <AlertTriangle size={14} className="text-red-400 mx-auto" />}</td>
                  <td className="p-3 text-center">{s.smoke ? <CheckCircle2 size={14} className="text-guardian-green mx-auto" /> : <AlertTriangle size={14} className="text-red-400 mx-auto" />}</td>
                  <td className="p-3 text-center text-white font-mono hidden md:table-cell">{s.temp}°C</td>
                  <td className="p-3 text-center text-white font-mono hidden md:table-cell">{s.water}m</td>
                  <td className="p-3 text-center text-white font-mono hidden md:table-cell">{s.air}</td>
                  <td className="p-3 text-center"><span className={`font-mono ${s.battery > 50 ? 'text-guardian-green' : 'text-guardian-yellow'}`}>{s.battery}%</span></td>
                  <td className="p-3 text-center"><span className={`font-mono ${s.ai > 90 ? 'text-guardian-green' : 'text-guardian-yellow'}`}>{s.ai}%</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AdminIncidents() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Incident Logs" subtitle={`${incidents.length} total incidents`}>
      <Card hover={false}>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {incidents.slice(0, 30).map((inc, i) => (
            <motion.div key={inc.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.01 }} className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{inc.id}</span>
                <div>
                  <p className="text-sm text-white">{inc.type}</p>
                  <p className="text-xs text-slate-400">{inc.streetLightId} · {inc.zone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-guardian-cyan">{inc.confidence}%</span>
                <Badge variant={inc.status === 'Resolved' ? 'success' : 'warning'} size="sm">{inc.status}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AdminAnalytics() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Analytics" subtitle="System-wide analytics and trends">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrendsChart />
        <WeeklyTrendsChart />
        <IncidentCategoryChart />
        <AiPerformanceChart />
        <ResponseTimeChart />
        <FireFloodChart />
      </div>
    </DashboardLayout>
  );
}

export function AdminReports() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Reports" subtitle="Citizen-submitted reports">
      <Card hover={false}>
        <div className="space-y-2">
          {reports.slice(0, 20).map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">{r.id}</span>
                <div>
                  <p className="text-sm text-white">{r.type}</p>
                  <p className="text-xs text-slate-400">{r.citizenName} · {r.zone}</p>
                </div>
              </div>
              <Badge variant={r.status === 'Resolved' ? 'success' : r.status === 'Reviewing' ? 'warning' : 'info'} size="sm">{r.status}</Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

export function AdminSystem() {
  const systems = [
    { name: 'AI Detection Engine', status: 'Operational', uptime: '99.9%', icon: Brain },
    { name: 'Mesh Communication', status: 'Operational', uptime: '99.8%', icon: Activity },
    { name: 'Sensor Network', status: 'Operational', uptime: '99.5%', icon: CpuIcon },
    { name: 'Data Pipeline', status: 'Degraded', uptime: '97.2%', icon: Server },
    { name: 'Notification Service', status: 'Operational', uptime: '99.9%', icon: Bell },
    { name: 'Map Services', status: 'Operational', uptime: '99.7%', icon: LightIcon },
  ];
  return (
    <DashboardLayout role={role} navItems={navItems} title="System Status" subtitle="All subsystems and services">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-guardian-elevated text-guardian-cyan">
                  <s.icon size={20} />
                </div>
                <Badge variant={s.status === 'Operational' ? 'success' : 'warning'}>{s.status}</Badge>
              </div>
              <p className="text-sm font-bold text-white">{s.name}</p>
              <p className="text-xs text-slate-400 mt-1">Uptime: <span className="text-guardian-green font-mono">{s.uptime}</span></p>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function AdminAI() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="AI Performance" subtitle="Model accuracy and detection metrics">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">AI Model Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Fire Detection', value: 98, color: 'from-red-500 to-orange-500' },
              { label: 'Theft Detection', value: 94, color: 'from-guardian-purple to-blue-500' },
              { label: 'Medical Emergency', value: 96, color: 'from-pink-500 to-red-500' },
              { label: 'Flood Detection', value: 92, color: 'from-guardian-blue to-guardian-cyan' },
              { label: 'Traffic Analysis', value: 95, color: 'from-guardian-yellow to-orange-500' },
              { label: 'Suspicious Activity', value: 93, color: 'from-guardian-green to-emerald-500' },
            ].map((m, i) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{m.label}</span>
                  <span className="text-xs font-mono text-white">{m.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-guardian-bg overflow-hidden">
                  <motion.div className={`h-full bg-gradient-to-r ${m.color}`} initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <AiPerformanceChart />
      </div>
    </DashboardLayout>
  );
}

export function AdminNotifications() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Notification Center" subtitle="System notifications and alerts">
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${n.type === 'alert' ? 'bg-red-500/10' : n.type === 'success' ? 'bg-guardian-green/10' : n.type === 'warning' ? 'bg-guardian-yellow/10' : 'bg-guardian-blue/10'}`}>
                  <span className="text-2xl">{n.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{n.title}</p>
                    {!n.read && <Badge variant="info" size="sm">New</Badge>}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{n.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function AdminSettings() {
  const { toast } = useToast();
  return (
    <DashboardLayout role={role} navItems={navItems} title="Settings" subtitle="System configuration">
      <Card>
        <h3 className="text-sm font-semibold text-white mb-4">System Configuration</h3>
        <div className="space-y-3">
          {['AI Auto-Dispatch', 'Emergency Alerts', 'Mesh Communication', 'Sensor Auto-Calibration', 'Predictive Analytics', 'Citizen Notifications'].map((s) => (
            <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface">
              <span className="text-sm text-white">{s}</span>
              <button onClick={() => toast('Configuration updated', 'success', '✅')} className="w-11 h-6 rounded-full bg-guardian-blue relative">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-white" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
