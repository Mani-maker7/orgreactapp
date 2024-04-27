import React, { useEffect, useState } from 'react';
import './student.css';

export default function StudentProfile() {         
  const [studentData, setStudentData] = useState(null); 
  useEffect(() => {
    const storedStudentData = localStorage.getItem('student'); 
    if (storedStudentData) {
      const parsedStudentData = JSON.parse(storedStudentData);
      setStudentData(parsedStudentData);
    }
  }, []);

  return (
    studentData ? (
      <div className='profile-card' >
        <p><strong>Student ID:</strong> {studentData.studentid}</p>
        <p><strong>Name:</strong> {studentData.studentname}</p>
        <p><strong>Gender:</strong> {studentData.gender}</p>
        <p><strong>Date of Birth:</strong> {studentData.dateofbirth}</p>
        <p><strong>Program:</strong> {studentData.program}</p>
        <p><strong>Department:</strong> {studentData.department}</p>
        <p><strong>Semester:</strong> {studentData.semester}</p>
        <p><strong>Year:</strong> {studentData.year}</p>
        <p><strong>Email:</strong> {studentData.email}</p>
        <p><strong>Password:</strong> {studentData.password}</p>
        <p><strong>Contact:</strong> {studentData.contact}</p>
      </div>
    ) : (
      <p>No Student Data Found</p>
    )
  );
}
