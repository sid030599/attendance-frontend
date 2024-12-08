import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [staffId, setStaffId] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/roster/shifts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShifts(response.data);
      } catch (err) {
        console.error('Error fetching shifts:', err);
      }
    };

    fetchShifts();
  }, []);

  const handleCreateShift = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/roster/shifts/',
        {
          staff: staffId,
          day_of_week: dayOfWeek,
          start_time: startTime,
          end_time: endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShifts([...shifts, response.data]);
      setStaffId('');
      setDayOfWeek('');
      setStartTime('');
      setEndTime('');
      setSuccess('Shift created successfully!');
    } catch (err) {
      setError('Failed to create shift.');
    }
  };

  return (
    <center>
    <div >
      <h2>Shifts</h2>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreateShift}>
        <input
          type="number"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          required
        />
        <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} required>
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit">Add Shift</button>
      </form>

      <h3>Existing Shifts</h3>
      {shifts.length > 0 ? (
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id}>
              Staff ID: {shift.staff.first_name} - Day: {shift.day_of_week} ({shift.start_time} - {shift.end_time})
            </li>
          ))}
        </ul>
      ) : (
        <p>No shifts available.</p>
      )}
    </div>
    </center>
  );
};

export default Shifts;
