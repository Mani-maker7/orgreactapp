import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";


export default function FacultyHome() {
  const [facultyName, setFacultyName] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch faculty details and courses taught by the faculty from the backend
    axios.get(`${config.url}/facultyschema`)
      .then(response => {
        setFacultyName(response.data.facultyname);
        setCourses(response.data.courses);
      })
      .catch(error => {
        console.error('Error fetching faculty data:', error);
        setError('Failed to fetch faculty data');
      });
  }, []);

  return (
    <div>
      <h2>Welcome, {facultyName}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Your Courses:</h3>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.courseName}</strong> - {course.courseCode}
          </li>
        ))}
      </ul>
    </div>
  );
}
