import { Navigate, Route, Routes } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import BarDetail from './pages/BarDetail';
import DJDetail from './pages/DJDetail';
import DefaultLayout from './layouts/DefaultLayout';
import PlainLayout from './layouts/PlainLayout';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      {/* ヘッダーあり */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/bars/:id" element={<BarDetail />} />
        <Route path="/djs/:id" element={<DJDetail />} />
      </Route>

      {/* ヘッダーなし */}
      <Route element={<PlainLayout />}>
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
