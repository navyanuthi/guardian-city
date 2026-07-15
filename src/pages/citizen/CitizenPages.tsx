import { motion } from 'framer-motion';
import {
  LayoutDashboard, Map, Lightbulb, Siren, FileText, Bell,
  HeartPulse, Building2, Cloud, Wind, Phone, History, User, Settings,
} from 'lucide-react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Card, StatCard, Button, Badge, Modal, useToast } from '../../components/ui';
import { CityMap } from '../../components/CityMap';
import {
  streetLights, facilities, citizens, reports,
  notifications,
} from '../../data/mockData';
import { useState } from 'react';
import type { StreetLight, Role } from '../../types';

const navItems = [
  { to: '/citizen', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/citizen/map', label: 'City Map', icon: <Map size={18} /> },
  { to: '/citizen/lights', label: 'Nearby Lights', icon: <Lightbulb size={18} /> },
  { to: '/citizen/sos', label: 'SOS / Report', icon: <Siren size={18} /> },
  { to: '/citizen/alerts', label: 'Alerts', icon: <Bell size={18} /> },
  { to: '/citizen/resources', label: 'Resources', icon: <HeartPulse size={18} /> },
  { to: '/citizen/weather', label: 'Weather & Air', icon: <Cloud size={18} /> },
  { to: '/citizen/contacts', label: 'Contacts', icon: <Phone size={18} /> },
  { to: '/citizen/history', label: 'Report History', icon: <History size={18} /> },
  { to: '/citizen/profile', label: 'Profile', icon: <User size={18} /> },
  { to: '/citizen/settings', label: 'Settings', icon: <Settings size={18} /> },
];

const role: Role = 'citizen';

export function CitizenDashboard() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Citizen Dashboard" subtitle="Welcome back, Aarav">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Siren size={20} />} label="Active Alerts" value="3" trend="Live" color="text-red-400" />
        <StatCard icon={<Lightbulb size={20} />} label="Nearby Lights" value="12" color="text-guardian-cyan" />
        <StatCard icon={<FileText size={20} />} label="Reports Filed" value="7" color="text-guardian-green" />
        <StatCard icon={<Bell size={20} />} label="Notifications" value="5" color="text-guardian-yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4">Smart City Map — Your Area</h3>
            <CityMap height="350px" />
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-semibold text-white mb-3">Emergency Alerts</h3>
            <div className="space-y-2">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-guardian-surface">
                  <span className="text-lg">{n.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{n.title}</p>
                    <p className="text-[10px] text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="danger" size="sm" icon={<Siren size={14} />}>SOS</Button>
              <Button variant="secondary" size="sm" icon={<FileText size={14} />}>Report</Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CitizenMap() {
  const [selected, setSelected] = useState<StreetLight | null>(null);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Interactive City Map" subtitle="Explore smart lights and facilities">
      <Card>
        <CityMap height="600px" onLightClick={setSelected} />
      </Card>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <LightDetails light={selected} />}
      </Modal>
    </DashboardLayout>
  );
}

function LightDetails({ light }: { light: StreetLight }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant={light.status === 'Normal' ? 'success' : light.status === 'Warning' ? 'warning' : 'danger'}>
          {light.status}
        </Badge>
        <span className="text-xs text-slate-400 font-mono">{light.id}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Detail label="Zone" value={light.zone} />
        <Detail label="Battery" value={`${light.battery}%`} />
        <Detail label="AI Health" value={`${light.aiHealth}%`} />
        <Detail label="Internet" value={light.internet} />
        <Detail label="Temperature" value={`${light.temperatureSensor}°C`} />
        <Detail label="Air Quality" value={`${light.airQuality} AQI`} />
        <Detail label="Water Level" value={`${light.waterLevelSensor}m`} />
        <Detail label="Solar Panel" value={light.solarPanel} />
      </div>
      <div className="flex flex-wrap gap-2">
        {light.camera && <Badge variant="info">Camera</Badge>}
        {light.motionSensor && <Badge variant="info">Motion</Badge>}
        {light.smokeSensor && <Badge variant="info">Smoke</Badge>}
        {light.emergencyButton && <Badge variant="info">SOS Button</Badge>}
        {light.speaker && <Badge variant="info">Speaker</Badge>}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-guardian-surface">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export function CitizenLights() {
  const [selected, setSelected] = useState<StreetLight | null>(null);
  const nearby = streetLights.slice(0, 12);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Nearby Smart Street Lights" subtitle="12 guardians in your area">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearby.map((light, i) => (
          <motion.div
            key={light.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="cursor-pointer" onClick={() => setSelected(light)}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    light.status === 'Normal' ? 'bg-guardian-green' : light.status === 'Warning' ? 'bg-guardian-yellow' : 'bg-red-500'
                  } animate-pulse`} />
                  <span className="text-sm font-bold text-white">{light.id}</span>
                </div>
                <Badge variant={light.status === 'Normal' ? 'success' : light.status === 'Warning' ? 'warning' : 'danger'}>
                  {light.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mb-3">{light.name}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-slate-500">Battery</p>
                  <p className="text-sm font-mono text-white">{light.battery}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">AI</p>
                  <p className="text-sm font-mono text-white">{light.aiHealth}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Net</p>
                  <p className="text-sm font-mono text-white">{light.internet === 'Online' ? '✓' : '✗'}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && <LightDetails light={selected} />}
      </Modal>
    </DashboardLayout>
  );
}

export function CitizenSOS() {
  const { toast } = useToast();
  const [sosActive, setSosActive] = useState(false);
  const [reportType, setReportType] = useState('Fire');
  const [uploads, setUploads] = useState({ photo: false, video: false, voice: false });

  const triggerSOS = () => {
    setSosActive(true);
    toast('SOS ALERT SENT — Nearest authority dispatched', 'alert', '🚨');
    setTimeout(() => setSosActive(false), 3000);
  };

  return (
    <DashboardLayout role={role} navItems={navItems} title="SOS & Report Emergency" subtitle="Report incidents and trigger emergency alerts">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center py-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerSOS}
            className={`relative w-48 h-48 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-all ${
              sosActive ? 'bg-red-600 shadow-neon-red' : 'bg-gradient-to-br from-red-500 to-red-700 shadow-neon-red'
            }`}
          >
            {sosActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-red-400"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="text-center">
              <Siren size={48} className="mx-auto mb-2" />
              <span className="text-lg">{sosActive ? 'SENDING...' : 'SOS'}</span>
            </div>
          </motion.button>
          <p className="text-sm text-slate-400 mt-6 text-center max-w-xs">
            Press to alert nearby authorities and smart lights. Your location will be shared instantly.
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Report Emergency</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 mb-2 block">Incident Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-guardian-surface border border-guardian-border text-white text-sm outline-none focus:border-guardian-blue/50"
              >
                {['Fire', 'Road Accident', 'Theft', 'Suspicious Activity', 'Woman Safety Alert', 'Medical Emergency', 'Flood', 'Gas Leak'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-2 block">Description</label>
              <textarea
                rows={3}
                placeholder="Describe the emergency..."
                className="w-full px-4 py-2.5 rounded-xl bg-guardian-surface border border-guardian-border text-white text-sm placeholder-slate-500 outline-none focus:border-guardian-blue/50 resize-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-2 block">Attach Evidence</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'photo', label: 'Photo', emoji: '📷' },
                  { key: 'video', label: 'Video', emoji: '🎥' },
                  { key: 'voice', label: 'Voice', emoji: '🎤' },
                ].map((u) => (
                  <button
                    key={u.key}
                    onClick={() => {
                      setUploads({ ...uploads, [u.key]: !uploads[u.key as keyof typeof uploads] });
                      toast(`${u.label} ${uploads[u.key as keyof typeof uploads] ? 'removed' : 'attached'}`, 'info', u.emoji);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      uploads[u.key as keyof typeof uploads]
                        ? 'bg-guardian-green/10 border-guardian-green/30 text-guardian-green'
                        : 'bg-guardian-surface border-guardian-border text-slate-400 hover:border-guardian-blue/50'
                    }`}
                  >
                    <span className="text-xl block">{u.emoji}</span>
                    <span className="text-xs">{u.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="danger"
              className="w-full"
              icon={<FileText size={16} />}
              onClick={() => toast('Emergency report submitted successfully', 'success', '✅')}
            >
              Submit Report
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export function CitizenAlerts() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Emergency Alerts" subtitle="Real-time safety notifications">
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  n.type === 'alert' ? 'bg-red-500/10' : n.type === 'success' ? 'bg-guardian-green/10' :
                  n.type === 'warning' ? 'bg-guardian-yellow/10' : 'bg-guardian-blue/10'
                }`}>
                  <span className="text-2xl">{n.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{n.title}</p>
                    {!n.read && <Badge variant="info">New</Badge>}
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

export function CitizenResources() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Nearby Resources" subtitle="Hospitals, police stations, and fire stations">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse size={18} className="text-pink-400" />
            <h3 className="text-sm font-semibold text-white">Nearby Hospitals</h3>
          </div>
          <div className="space-y-2">
            {facilities.filter((f) => f.type === 'Hospital').map((f) => (
              <FacilityRow key={f.id} f={f} color="text-pink-400" />
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={18} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Police & Fire Stations</h3>
          </div>
          <div className="space-y-2">
            {facilities.filter((f) => f.type !== 'Hospital' && f.type !== 'Safe Zone' && f.type !== 'Danger Zone').map((f) => (
              <FacilityRow key={f.id} f={f} color="text-blue-400" />
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <h3 className="text-sm font-semibold text-white mb-4">Resource Map</h3>
        <CityMap height="400px" showLights={false} />
      </Card>
    </DashboardLayout>
  );
}

function FacilityRow({ f, color }: { f: typeof facilities[0]; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-guardian-surface hover:bg-guardian-elevated transition-colors">
      <div>
        <p className="text-sm font-medium text-white">{f.name}</p>
        <p className="text-xs text-slate-400">{f.address}</p>
        <p className="text-xs text-slate-500">{f.phone}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-mono ${color}`}>{f.distance} km</p>
        <Badge variant="info" size="sm">{f.type}</Badge>
      </div>
    </div>
  );
}

export function CitizenWeather() {
  return (
    <DashboardLayout role={role} navItems={navItems} title="Weather & Air Quality" subtitle="Current environmental conditions">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Cloud size={18} className="text-guardian-cyan" />
            <h3 className="text-sm font-semibold text-white">Weather</h3>
          </div>
          <div className="text-center py-6">
            <p className="text-6xl font-bold text-white font-mono">28°C</p>
            <p className="text-slate-400 mt-2">Partly Cloudy</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <WeatherStat label="Humidity" value="65%" />
            <WeatherStat label="Wind" value="12 km/h" />
            <WeatherStat label="UV Index" value="6" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Wind size={18} className="text-guardian-green" />
            <h3 className="text-sm font-semibold text-white">Air Quality</h3>
          </div>
          <div className="text-center py-6">
            <p className="text-6xl font-bold text-guardian-yellow font-mono">87</p>
            <p className="text-guardian-yellow mt-2">Moderate</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <WeatherStat label="PM2.5" value="42" />
            <WeatherStat label="PM10" value="68" />
            <WeatherStat label="O3" value="35" />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function WeatherStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-guardian-surface text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-mono text-white mt-1">{value}</p>
    </div>
  );
}

export function CitizenContacts() {
  const contacts = [
    { name: 'Emergency Hotline', number: '112', icon: '🚨' },
    { name: 'Police', number: '100', icon: '🚓' },
    { name: 'Fire Brigade', number: '101', icon: '🔥' },
    { name: 'Ambulance', number: '108', icon: '🚑' },
    { name: 'Women Helpline', number: '1091', icon: '👩' },
    { name: 'Child Helpline', number: '1098', icon: '🧒' },
    { name: 'Disaster Management', number: '1070', icon: '🌊' },
    { name: 'ACGN Control Room', number: '+91 112 233', icon: '🛡' },
  ];
  return (
    <DashboardLayout role={role} navItems={navItems} title="Emergency Contacts" subtitle="Quick access to emergency services">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map((c, i) => (
          <motion.div key={c.number} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="text-center">
              <span className="text-3xl block mb-2">{c.icon}</span>
              <p className="text-sm font-medium text-white">{c.name}</p>
              <p className="text-xl font-bold neon-text mt-1">{c.number}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export function CitizenHistory() {
  const myReports = reports.slice(0, 10);
  return (
    <DashboardLayout role={role} navItems={navItems} title="Report History" subtitle="Your submitted emergency reports">
      <Card hover={false}>
        <div className="space-y-3">
          {myReports.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-4 rounded-xl bg-guardian-surface hover:bg-guardian-elevated transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500">{r.id}</span>
                <div>
                  <p className="text-sm font-medium text-white">{r.type}</p>
                  <p className="text-xs text-slate-400">{new Date(r.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {r.photo && <span className="text-xs">📷</span>}
                {r.video && <span className="text-xs">🎥</span>}
                {r.voice && <span className="text-xs">🎤</span>}
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

export function CitizenProfile() {
  const me = citizens[0];
  return (
    <DashboardLayout role={role} navItems={navItems} title="My Profile" subtitle="Account information">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-guardian-blue to-guardian-cyan mx-auto flex items-center justify-center text-2xl font-bold text-white mb-4">
            {me.name.charAt(0)}
          </div>
          <p className="text-lg font-bold text-white">{me.name}</p>
          <p className="text-sm text-slate-400">{me.email}</p>
          <Badge variant="success" size="md">Active</Badge>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-sm font-semibold text-white mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <Detail label="Phone" value={me.phone} />
              <Detail label="Zone" value={me.zone} />
              <Detail label="Address" value={me.address} />
              <Detail label="Reports Filed" value={String(me.reports)} />
              <Detail label="Member Since" value={new Date(me.registeredAt).toLocaleDateString()} />
              <Detail label="Status" value={me.status} />
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export function CitizenSettings() {
  const { toast } = useToast();
  return (
    <DashboardLayout role={role} navItems={navItems} title="Settings" subtitle="Manage your preferences">
      <Card>
        <h3 className="text-sm font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {['Emergency Alerts', 'Safety Notifications', 'Weather Updates', 'Air Quality Warnings', 'Community Reports'].map((s) => (
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
