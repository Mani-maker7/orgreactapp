import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";


export default function PostAttendance() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of students from the backend
    axios.get(`${config.url}/students`)
      .then(response => {
        setStudents(response.data); // Assuming response.data is an array of student objects
        // Initialize attendance data for each student
        setAttendanceData(response.data.map(student => ({ studentId: student.id, status: 'absent' })));
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleChange = (e, studentId) => {
    const updatedAttendanceData = attendanceData.map(item => {
      if (item.studentId === studentId) {
        return { ...item, status: e.target.value };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/attendance`, attendanceData);
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Post Attendance</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {students.map(student => (
          <div key={student.id}>
            <label htmlFor={`status_${student.id}`}>{student.name}:</label>
            <select id={`status_${student.id}`} value={attendanceData.find(item => item.studentId === student.id).status} onChange={(e) => handleChange(e, student.id)}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
