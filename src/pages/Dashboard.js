import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance'; // Use the custom Axios instance

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/'); // Axios instance automatically handles tokens
        setUserData(response.data.user_data);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        window.location.href = '/';  // Redirect to login page
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error (optional)
    }
  };

  return (
    <center>
      <div>
        <h2>Dashboard</h2>

        {/* Display logged-in user information */}
        {userData ? (
          <div>
            <h3>Welcome, {userData.username}!</h3>
            <p>Email: {userData.email || "Not provided"}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

      <button onClick={handleLogout}>Logout</button>

        {/* Navigation Links */}
        <div style={{ marginTop: "20px" }}>
          <h3>Navigation</h3>
          <ul
            style={{
              width: "20%",
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            {userData?.role === "manager" && (
              <li>
                <Link to="/attendance-records">Attendance Records</Link>
              </li>
            )}
            <li>
              <Link to="/weekly-offs">Weekly Offs</Link>
            </li>
            <li>
              <Link to="/shifts">Shifts</Link>
            </li>
            <li>
              <Link to="/attendance">Add attendance</Link>
            </li>
          </ul>
        </div>
      </div>
    </center>
  );
};

export default Dashboard;
