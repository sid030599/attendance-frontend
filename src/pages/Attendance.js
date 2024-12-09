import React, { useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [image, setImage] = useState(null);
  const [shiftId, setShiftId] = useState(''); // State for shift input
  const [message, setMessage] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('shift', shiftId); // Send the shift ID along with the image

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://127.0.0.1:8000/api/attendance/records/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Attendance marked successfully!');
    } catch (err) {
      setMessage('Failed to mark attendance.');
    }
  };

  return (
    <center>
      <div>
        <h2>Mark Attendance</h2>
        <form onSubmit={handleImageUpload}>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            required
          />
          <input 
            type="number" 
            placeholder="Enter Shift ID"
            value={shiftId} 
            onChange={(e) => setShiftId(e.target.value)} 
            required 
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </center>
  );
};

export default Attendance;
