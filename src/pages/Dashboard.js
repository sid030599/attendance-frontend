import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user_data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  return (
  <center>
    <div>
      <h2>Dashboard</h2>

      {/* Display logged-in user information */}
      {userData ? (
        <div>
          <h3>Welcome, {userData.username}!</h3>
          <p>Email: {userData.email || 'Not provided'}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      {/* Navigation Links */}
      <div style={{ marginTop: '20px' }}>
        <h3>Navigation</h3>
        <ul>
          <li>
            <Link to="/attendance-records">Attendance Records</Link>
          </li>
          <li>
            <Link to="/weekly-offs">Weekly Offs</Link>
          </li>
          <li>
            <Link to="/shifts">Shifts</Link>
          </li>
        </ul>
      </div>
    </div>
    </center>
  );
};

export default Dashboard;
