import type {
  StreetLight,
  Incident,
  Citizen,
  Authority,
  NotificationItem,
  ActivityLog,
  Report,
  CityFacility,
  AnalyticsEntry,
  WeeklyTrend,
  IncidentType,
  Severity,
  IncidentStatus,
} from '../types';

const CITY_CENTER = { lat: 28.6139, lng: 77.209 };

const ZONES = [
  'Central District',
  'Riverside',
  'Tech Park',
  'Old Town',
  'Green Valley',
  'Industrial Zone',
  'University Area',
  'Harbor Front',
];

const INCIDENT_TYPES: IncidentType[] = [
  'Fire',
  'Road Accident',
  'Theft',
  'Suspicious Activity',
  'Woman Safety Alert',
  'Medical Emergency',
  'Flood',
  'Gas Leak',
  'Traffic Congestion',
  'Tree Collapse',
  'Electric Pole Failure',
  'Animal on Road',
];

const SEVERITIES: Severity[] = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES: IncidentStatus[] = ['Detected', 'Accepted', 'Dispatched', 'In Progress', 'Resolved'];

const FIRST_NAMES = [
  'Aarav', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Sneha', 'Arjun', 'Kavya',
  'Aditya', 'Meera', 'Karan', 'Riya', 'Dev', 'Ishita', 'Nikhil', 'Pooja',
  'Rahul', 'Sara', 'Manav', 'Diya', 'Aryan', 'Naina', 'Yash', 'Anika',
  'Sai', 'Tanvi', 'Ravi', 'Myra', 'Dhruv', 'Kiara',
];
const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Gupta', 'Singh',
  'Kapoor', 'Mehta', 'Rao', 'Joshi', 'Malhotra', 'Chopra', 'Bose',
];

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
function randInt(min: number, max: number): number {
  return Math.floor(rand(min, max + 1));
}
function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}
function roundTo(n: number, digits: number): number {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
}

function randomName(): string {
  return `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`;
}

function randomDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - randInt(0, daysBack));
  d.setHours(randInt(0, 23), randInt(0, 59), randInt(0, 59));
  return d.toISOString();
}

function jitter(base: number, amount: number): number {
  return roundTo(base + rand(-amount, amount), 4);
}

// ---- Street Lights ----
export const streetLights: StreetLight[] = Array.from({ length: 40 }, (_, i) => {
  const lat = jitter(CITY_CENTER.lat, 0.05);
  const lng = jitter(CITY_CENTER.lng, 0.06);
  const statusRoll = Math.random();
  const status = statusRoll > 0.9 ? 'Emergency' : statusRoll > 0.75 ? 'Warning' : 'Normal';
  const aiHealth = randInt(78, 100);
  const battery = randInt(35, 100);
  return {
    id: `SL-${String(i + 1).padStart(3, '0')}`,
    name: `Guardian Light ${i + 1}`,
    lat,
    lng,
    camera: Math.random() > 0.05,
    motionSensor: Math.random() > 0.02,
    smokeSensor: Math.random() > 0.1,
    temperatureSensor: roundTo(rand(22, 42), 1),
    waterLevelSensor: roundTo(rand(0, 15), 1),
    airQuality: randInt(40, 180),
    emergencyButton: Math.random() > 0.03,
    speaker: Math.random() > 0.08,
    solarPanel: pick(['Online', 'Offline', 'Charging']) as StreetLight['solarPanel'],
    battery,
    internet: pick(['Online', 'Offline', 'Weak']) as StreetLight['internet'],
    aiHealth,
    status: status as StreetLight['status'],
    zone: pick(ZONES),
    lastMaintenance: randomDate(30),
  };
});

// ---- Incidents ----
const ACTIONS: Record<IncidentType, string> = {
  Fire: 'Dispatch Fire Brigade, evacuate 200m radius',
  'Road Accident': 'Dispatch Ambulance + Traffic Control',
  Theft: 'Alert nearest patrol, review camera footage',
  'Suspicious Activity': 'Deploy patrol unit, increase monitoring',
  'Woman Safety Alert': 'Dispatch nearest officer immediately',
  'Medical Emergency': 'Dispatch Ambulance to location',
  Flood: 'Issue flood warning, deploy rescue team',
  'Gas Leak': 'Evacuate area, dispatch Gas Safety team',
  'Traffic Congestion': 'Reroute traffic, deploy traffic officers',
  'Tree Collapse': 'Dispatch Municipal crew, clear road',
  'Electric Pole Failure': 'Dispatch Power Board, isolate area',
  'Animal on Road': 'Dispatch Animal Control, warn traffic',
};

export const incidents: Incident[] = Array.from({ length: 200 }, (_, i) => {
  const type = pick(INCIDENT_TYPES);
  const light = pick(streetLights);
  const status = pick(STATUSES);
  return {
    id: `INC-${String(1000 + i).padStart(4, '0')}`,
    type,
    confidence: randInt(82, 99),
    severity: pick(SEVERITIES),
    detectedAt: randomDate(60),
    streetLightId: light.id,
    streetLightName: light.name,
    lat: light.lat,
    lng: light.lng,
    nearestAuthority: `${pick(['Central', 'Riverside', 'Tech Park', 'Harbor'])} ${pick(['Police', 'Fire', 'Medical'])} Unit`,
    recommendedAction: ACTIONS[type],
    estimatedResponseMin: randInt(3, 18),
    status,
    description: `${type} detected by ${light.name} AI module. ${ACTIONS[type]}.`,
    zone: light.zone,
  };
});

// ---- Citizens ----
export const citizens: Citizen[] = Array.from({ length: 100 }, (_, i) => {
  const name = randomName();
  return {
    id: `CIT-${String(1000 + i).padStart(4, '0')}`,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@citizen.acgn`,
    phone: `+91 ${randInt(70, 99)}${randInt(10000000, 99999999)}`,
    zone: pick(ZONES),
    address: `${randInt(1, 200)} ${pick(['MG Road', 'Park Street', 'Gandhi Nagar', 'Lake View', 'Hill Road'])}`,
    registeredAt: randomDate(180),
    reports: randInt(0, 12),
    status: Math.random() > 0.15 ? 'Active' : 'Inactive',
    avatar: '',
  };
});

// ---- Authorities ----
const AUTH_ROLES = ['Police', 'Fire', 'Medical', 'Traffic', 'Admin'] as const;
export const authorities: Authority[] = Array.from({ length: 25 }, (_, i) => {
  const name = randomName();
  return {
    id: `AUTH-${String(100 + i).padStart(3, '0')}`,
    name,
    role: pick(AUTH_ROLES as unknown as string[]) as Authority['role'],
    email: `${name.toLowerCase().replace(' ', '.')}@authority.acgn`,
    phone: `+91 ${randInt(70, 99)}${randInt(10000000, 99999999)}`,
    zone: pick(ZONES),
    activeIncidents: randInt(0, 5),
    resolvedIncidents: randInt(10, 80),
    status: pick(['On Duty', 'Off Duty', 'Responding']) as Authority['status'],
    avatar: '',
  };
});

// ---- Notifications ----
export const notifications: NotificationItem[] = [
  { id: 'N1', icon: '🔥', title: 'Fire Detected', message: 'Fire detected near Central Park — SL-012', time: '2 min ago', type: 'alert', read: false },
  { id: 'N2', icon: '🚑', title: 'Ambulance Dispatched', message: 'Ambulance unit dispatched to MG Road', time: '5 min ago', type: 'info', read: false },
  { id: 'N3', icon: '🚓', title: 'Police Responding', message: 'Patrol unit responding to Riverside zone', time: '8 min ago', type: 'info', read: false },
  { id: 'N4', icon: '⚠️', title: 'AI Confidence Increased', message: 'AI confidence on INC-1042 increased to 96%', time: '12 min ago', type: 'warning', read: false },
  { id: 'N5', icon: '✅', title: 'Incident Resolved', message: 'INC-1038 resolved by Harbor Front unit', time: '20 min ago', type: 'success', read: true },
  { id: 'N6', icon: '💨', title: 'Smoke Detected', message: 'Smoke sensor triggered on SL-007', time: '25 min ago', type: 'alert', read: true },
  { id: 'N7', icon: '🌊', title: 'Flood Risk Warning', message: 'Water level rising in Green Valley zone', time: '35 min ago', type: 'warning', read: true },
  { id: 'N8', icon: '🌳', title: 'Tree Collapse', message: 'Tree collapse reported on Hill Road — SL-019', time: '45 min ago', type: 'alert', read: true },
];

// ---- Activity Logs ----
const ACTIONS_LOG = [
  'resolved incident',
  'dispatched team to',
  'accepted incident',
  'updated status of',
  'reviewed report',
  'marked in progress',
  'assigned team to',
  'closed report',
];
export const activityLogs: ActivityLog[] = Array.from({ length: 30 }, (_, i) => ({
  id: `LOG-${String(i + 1).padStart(3, '0')}`,
  user: randomName(),
  action: pick(ACTIONS_LOG),
  target: pick(incidents).id,
  time: `${randInt(1, 59)} min ago`,
  role: pick(['authority', 'admin', 'citizen'] as const),
}));

// ---- Reports ----
export const reports: Report[] = Array.from({ length: 40 }, (_, i) => ({
  id: `RPT-${String(500 + i).padStart(4, '0')}`,
  citizenId: pick(citizens).id,
  citizenName: pick(citizens).name,
  type: pick(INCIDENT_TYPES),
  description: 'Reported via Citizen Portal SOS module.',
  status: pick(['Pending', 'Reviewing', 'Resolved']) as Report['status'],
  submittedAt: randomDate(30),
  photo: Math.random() > 0.5,
  video: Math.random() > 0.7,
  voice: Math.random() > 0.6,
  zone: pick(ZONES),
}));

// ---- City Facilities ----
export const facilities: CityFacility[] = [
  { id: 'F1', name: 'Central Police Station', type: 'Police Station', lat: jitter(CITY_CENTER.lat, 0.03), lng: jitter(CITY_CENTER.lng, 0.03), address: '12 MG Road', phone: '+91 100', distance: 1.2 },
  { id: 'F2', name: 'City General Hospital', type: 'Hospital', lat: jitter(CITY_CENTER.lat, 0.04), lng: jitter(CITY_CENTER.lng, 0.02), address: '45 Park Street', phone: '+91 108', distance: 2.1 },
  { id: 'F3', name: 'Riverside Fire Station', type: 'Fire Station', lat: jitter(CITY_CENTER.lat, 0.02), lng: jitter(CITY_CENTER.lng, 0.04), address: '78 River Road', phone: '+91 101', distance: 1.8 },
  { id: 'F4', name: 'Tech Park Police Outpost', type: 'Police Station', lat: jitter(CITY_CENTER.lat, 0.05), lng: jitter(CITY_CENTER.lng, 0.05), address: '3 Tech Park Ave', phone: '+91 100', distance: 3.4 },
  { id: 'F5', name: 'Green Valley Medical Center', type: 'Hospital', lat: jitter(CITY_CENTER.lat, 0.06), lng: jitter(CITY_CENTER.lng, 0.01), address: '9 Valley Road', phone: '+91 108', distance: 4.2 },
  { id: 'F6', name: 'Harbor Fire Rescue', type: 'Fire Station', lat: jitter(CITY_CENTER.lat, 0.01), lng: jitter(CITY_CENTER.lng, 0.06), address: '22 Harbor Way', phone: '+91 101', distance: 5.0 },
  { id: 'F7', name: 'Central Safe Zone', type: 'Safe Zone', lat: jitter(CITY_CENTER.lat, 0.02), lng: jitter(CITY_CENTER.lng, 0.02), address: 'Central Plaza', phone: 'N/A', distance: 0.8 },
  { id: 'F8', name: 'Old Town Danger Zone', type: 'Danger Zone', lat: jitter(CITY_CENTER.lat, 0.04), lng: jitter(CITY_CENTER.lng, 0.05), address: 'Old Town Sector 7', phone: 'N/A', distance: 2.9 },
];

// ---- Analytics ----
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const analyticsData: AnalyticsEntry[] = MONTHS.map((month) => ({
  month,
  activeIncidents: randInt(8, 25),
  resolvedIncidents: randInt(60, 120),
  avgResponseMin: randInt(4, 12),
  fireIncidents: randInt(5, 20),
  crimeIncidents: randInt(10, 35),
  floodRisk: randInt(15, 60),
  aiAccuracy: randInt(91, 99),
  sensorHealth: randInt(88, 99),
}));

export const weeklyTrends: WeeklyTrend[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => ({
  day,
  incidents: randInt(12, 30),
  resolved: randInt(10, 28),
  responseTime: randInt(4, 12),
}));

export const incidentCategories = INCIDENT_TYPES.map((name, i) => ({
  name,
  value: randInt(8, 35),
  color: ['#00b4ff', '#00e5ff', '#10d98a', '#fbbf24', '#ef4444', '#a78bfa', '#f97316', '#ec4899', '#06b6d4', '#84cc16', '#eab308', '#f43f5e'][i],
}));

export const CITY_CENTER_COORDS = CITY_CENTER;
export const ZONE_NAMES = ZONES;
export const INCIDENT_TYPES_LIST = INCIDENT_TYPES;
