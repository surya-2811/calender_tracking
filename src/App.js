import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/User';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import Notifications from './components/Notifications';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-calendar" element={<CalendarView />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
};

export default App;