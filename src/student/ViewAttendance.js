import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";

export default function ViewAttendance() {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch the list of students and their attendance data from the backend
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

  // Calculate attendance percentage for each student
  const calculateAttendancePercentage = (studentId) => {
    const studentAttendanceData = attendanceData.filter(item => item.studentId === studentId);
    const totalClasses = studentAttendanceData.length;
    const presentClasses = studentAttendanceData.filter(item => item.status === 'present').length;
    return totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;
  };

  return (
    <div>
      <h2>View Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{calculateAttendancePercentage(student.id)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
