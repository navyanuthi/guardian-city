import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  analyticsData, weeklyTrends, incidentCategories,
} from '../data/mockData';

const tooltipStyle = {
  backgroundColor: '#0c1322',
  border: '1px solid #1a2a44',
  borderRadius: '12px',
  color: '#e2e8f0',
  fontSize: '12px',
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function MonthlyTrendsChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Monthly Incident Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={analyticsData}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10d98a" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10d98a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="activeIncidents" stroke="#00e5ff" fill="url(#g1)" name="Active" />
          <Area type="monotone" dataKey="resolvedIncidents" stroke="#10d98a" fill="url(#g2)" name="Resolved" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function WeeklyTrendsChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Weekly Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weeklyTrends}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="incidents" fill="#00b4ff" name="Incidents" radius={[4, 4, 0, 0]} />
          <Bar dataKey="resolved" fill="#10d98a" name="Resolved" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function IncidentCategoryChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Incident Categories</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={incidentCategories}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
          >
            {incidentCategories.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 10 }} layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function ResponseTimeChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Average Response Time (min)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="avgResponseMin" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24' }} name="Avg Response" />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function FireFloodChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Fire Hotspots & Flood Risk</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="fireIncidents" fill="#ef4444" name="Fire" radius={[4, 4, 0, 0]} />
          <Bar dataKey="floodRisk" fill="#00b4ff" name="Flood Risk" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function AiPerformanceChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">AI Accuracy & Sensor Health</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={analyticsData.slice(0, 8)}>
          <PolarGrid stroke="#1a2a44" />
          <PolarAngleAxis dataKey="month" stroke="#64748b" fontSize={10} />
          <PolarRadiusAxis stroke="#64748b" fontSize={9} angle={90} domain={[80, 100]} />
          <Radar name="AI Accuracy" dataKey="aiAccuracy" stroke="#00e5ff" fill="#00e5ff" fillOpacity={0.3} />
          <Radar name="Sensor Health" dataKey="sensorHealth" stroke="#10d98a" fill="#10d98a" fillOpacity={0.2} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function CrimeHeatmapChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Crime vs Fire Incidents</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={analyticsData}>
          <defs>
            <linearGradient id="crime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="crimeIncidents" stroke="#a78bfa" fill="url(#crime)" name="Crime" />
          <Area type="monotone" dataKey="fireIncidents" stroke="#ef4444" fill="url(#crime)" name="Fire" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function ResponseEfficiencyChart() {
  return (
    <motion.div {...fadeUp} className="glass p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Response Efficiency</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={weeklyTrends} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#1a2a44" />
          <XAxis type="number" stroke="#64748b" fontSize={11} />
          <YAxis dataKey="day" type="category" stroke="#64748b" fontSize={11} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="responseTime" fill="#00e5ff" name="Response Time (min)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
