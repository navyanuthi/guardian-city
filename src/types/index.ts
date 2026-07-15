export type Role = 'citizen' | 'authority' | 'admin';

export type IncidentType =
  | 'Fire'
  | 'Road Accident'
  | 'Theft'
  | 'Suspicious Activity'
  | 'Woman Safety Alert'
  | 'Medical Emergency'
  | 'Flood'
  | 'Gas Leak'
  | 'Traffic Congestion'
  | 'Tree Collapse'
  | 'Electric Pole Failure'
  | 'Animal on Road';

export type IncidentStatus = 'Detected' | 'Accepted' | 'Dispatched' | 'In Progress' | 'Resolved';
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export type LightStatus = 'Normal' | 'Warning' | 'Emergency';

export interface StreetLight {
  id: string;
  name: string;
  lat: number;
  lng: number;
  camera: boolean;
  motionSensor: boolean;
  smokeSensor: boolean;
  temperatureSensor: number;
  waterLevelSensor: number;
  airQuality: number;
  emergencyButton: boolean;
  speaker: boolean;
  solarPanel: 'Online' | 'Offline' | 'Charging';
  battery: number;
  internet: 'Online' | 'Offline' | 'Weak';
  aiHealth: number;
  status: LightStatus;
  zone: string;
  lastMaintenance: string;
}

export interface Incident {
  id: string;
  type: IncidentType;
  confidence: number;
  severity: Severity;
  detectedAt: string;
  streetLightId: string;
  streetLightName: string;
  lat: number;
  lng: number;
  nearestAuthority: string;
  recommendedAction: string;
  estimatedResponseMin: number;
  status: IncidentStatus;
  description: string;
  zone: string;
}

export interface Citizen {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  address: string;
  registeredAt: string;
  reports: number;
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface Authority {
  id: string;
  name: string;
  role: 'Police' | 'Fire' | 'Medical' | 'Traffic' | 'Admin';
  email: string;
  phone: string;
  zone: string;
  activeIncidents: number;
  resolvedIncidents: number;
  status: 'On Duty' | 'Off Duty' | 'Responding';
  avatar: string;
}

export interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  read: boolean;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  role: Role;
}

export interface Report {
  id: string;
  citizenId: string;
  citizenName: string;
  type: IncidentType;
  description: string;
  status: 'Pending' | 'Reviewing' | 'Resolved';
  submittedAt: string;
  photo: boolean;
  video: boolean;
  voice: boolean;
  zone: string;
}

export interface CityFacility {
  id: string;
  name: string;
  type: 'Police Station' | 'Hospital' | 'Fire Station' | 'Safe Zone' | 'Danger Zone';
  lat: number;
  lng: number;
  address: string;
  phone: string;
  distance: number;
}

export interface AnalyticsEntry {
  month: string;
  activeIncidents: number;
  resolvedIncidents: number;
  avgResponseMin: number;
  fireIncidents: number;
  crimeIncidents: number;
  floodRisk: number;
  aiAccuracy: number;
  sensorHealth: number;
}

export interface WeeklyTrend {
  day: string;
  incidents: number;
  resolved: number;
  responseTime: number;
}

export interface IncidentCategory {
  name: string;
  value: number;
  color: string;
}
