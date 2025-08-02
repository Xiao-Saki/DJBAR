import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import BarDetail from './pages/BarDetail';
import DJDetail from './pages/DJDetail';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/bars/:id" element={<BarDetail />} />
          <Route path="/djs/:id" element={<DJDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
