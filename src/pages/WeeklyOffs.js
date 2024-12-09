import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeeklyOffs = () => {
  const [weeklyOffs, setWeeklyOffs] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchWeeklyOffs = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/roster/weekly-offs/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWeeklyOffs(response.data);
      } catch (err) {
        console.error('Error fetching weekly-offs:', err);
      }
    };

    fetchWeeklyOffs();
  }, []);

  const handleCreateWeeklyOff = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/roster/weekly-offs/',
        {
          staff: staffId,
          day_of_week: dayOfWeek,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeeklyOffs([...weeklyOffs, response.data]);
      setStaffId('');
      setDayOfWeek('');
      setSuccess('Weekly off created successfully!');
    } catch (err) {
      setError('Failed to create weekly off.');
    }
  };

  return (
    <center>
      <div>
        <h2>Weekly-Offs</h2>

        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleCreateWeeklyOff}>
          <input
            type="number"
            placeholder="Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            required
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button type="submit">Add Weekly Off</button>
        </form>

        <h3>Existing Weekly-Offs</h3>
        {weeklyOffs.length > 0 ? (
          <ul
            style={{
              width: "30%",
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            {weeklyOffs.map((off) => (
              <li key={off.id}>
                Staff ID: {off.staff.first_name} - Day: {off.day_of_week}
              </li>
            ))}
          </ul>
        ) : (
          <p>No weekly-offs available.</p>
        )}
      </div>
    </center>
  );
};

export default WeeklyOffs;
