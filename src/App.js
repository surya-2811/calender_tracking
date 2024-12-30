import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import Notifications from './components/Notifications';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
};

export default App;