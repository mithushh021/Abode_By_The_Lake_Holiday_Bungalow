import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Calendar from './pages/Calendar';
import Guests from './pages/Guests';
import CheckInOut from './pages/CheckInOut';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="guests" element={<Guests />} />
          <Route path="checkinout" element={<CheckInOut />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;