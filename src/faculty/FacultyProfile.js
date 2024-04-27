import React, { useEffect, useState } from 'react';
import './faculty.css';

export default function FacultyProfile() {          // Changed function name to FacultyProfile
  const [facultyData, setFacultyData] = useState(null); // Changed variable name to facultyData

  useEffect(() => {
    const storedFacultyData = localStorage.getItem('faculty'); // Changed localStorage key to 'faculty'
    if (storedFacultyData) {
      const parsedFacultyData = JSON.parse(storedFacultyData);
      setFacultyData(parsedFacultyData);
    }
  }, []);

  return (
    facultyData ? ( // Changed variable name to facultyData
      <div className='profile-card'>
        <p><strong>Faculty Id:</strong> {facultyData.fullname}</p> {/* Changed variable name to facultyData */}
        <p><strong>Name:</strong> {facultyData.facultyname}</p>
        <p><strong>Gender:</strong> {facultyData.gender}</p>
        <p><strong>Department:</strong> {facultyData.department}</p>
        <p><strong>Qualification:</strong> {facultyData.qualification}</p>
        <p><strong>Designation:</strong> {facultyData.designation}</p>
        <p><strong>Email:</strong> {facultyData.email}</p>
        <p><strong>Password:</strong> {facultyData.password}</p>
        <p><strong>Contact:</strong> {facultyData.contact}</p>
      </div>
    ) : (
      <p>No Faculty Data Found</p>
    )
  );
}
