import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { LandingPage } from './pages/LandingPage';
import { RoleSelection } from './pages/RoleSelection';
import {
  CitizenDashboard, CitizenMap, CitizenLights, CitizenSOS,
  CitizenAlerts, CitizenResources, CitizenWeather, CitizenContacts,
  CitizenHistory, CitizenProfile, CitizenSettings,
} from './pages/citizen/CitizenPages';
import {
  AuthorityDashboard, AuthorityIncidents, AuthorityMap, AuthorityAI,
  AuthorityDispatch, AuthorityAnalytics, AuthorityReports,
  AuthorityActivity, AuthorityHistory, AuthoritySettings,
} from './pages/authority/AuthorityPages';
import {
  AdminDashboard, AdminCitizens, AdminAuthorities, AdminLights,
  AdminSensors, AdminIncidents, AdminAnalytics, AdminReports,
  AdminSystem, AdminAI, AdminNotifications, AdminSettings,
} from './pages/admin/AdminPages';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/launch" element={<RoleSelection />} />

          {/* Citizen */}
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/citizen/map" element={<CitizenMap />} />
          <Route path="/citizen/lights" element={<CitizenLights />} />
          <Route path="/citizen/sos" element={<CitizenSOS />} />
          <Route path="/citizen/alerts" element={<CitizenAlerts />} />
          <Route path="/citizen/resources" element={<CitizenResources />} />
          <Route path="/citizen/weather" element={<CitizenWeather />} />
          <Route path="/citizen/contacts" element={<CitizenContacts />} />
          <Route path="/citizen/history" element={<CitizenHistory />} />
          <Route path="/citizen/profile" element={<CitizenProfile />} />
          <Route path="/citizen/settings" element={<CitizenSettings />} />

          {/* Authority */}
          <Route path="/authority" element={<AuthorityDashboard />} />
          <Route path="/authority/incidents" element={<AuthorityIncidents />} />
          <Route path="/authority/map" element={<AuthorityMap />} />
          <Route path="/authority/ai" element={<AuthorityAI />} />
          <Route path="/authority/dispatch" element={<AuthorityDispatch />} />
          <Route path="/authority/analytics" element={<AuthorityAnalytics />} />
          <Route path="/authority/reports" element={<AuthorityReports />} />
          <Route path="/authority/activity" element={<AuthorityActivity />} />
          <Route path="/authority/history" element={<AuthorityHistory />} />
          <Route path="/authority/settings" element={<AuthoritySettings />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/citizens" element={<AdminCitizens />} />
          <Route path="/admin/authorities" element={<AdminAuthorities />} />
          <Route path="/admin/lights" element={<AdminLights />} />
          <Route path="/admin/sensors" element={<AdminSensors />} />
          <Route path="/admin/incidents" element={<AdminIncidents />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/system" element={<AdminSystem />} />
          <Route path="/admin/ai" element={<AdminAI />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
