import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import AttendanceRecords from './pages/AttendanceRecords';
import WeeklyOffs from './pages/WeeklyOffs';
import Shifts from './pages/Shifts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-records" element={<AttendanceRecords />} />
        <Route path="/weekly-offs" element={<WeeklyOffs />} />
        <Route path="/shifts" element={<Shifts />} />
      </Routes>
    </Router>
  );
};

export default App;
