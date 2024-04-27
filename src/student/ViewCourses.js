import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of courses assigned to the student from the backend
    axios.get(`${config.url}/viewcourses`)
      .then(response => {
        setCourses(response.data); // Assuming response.data is an array of course objects
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>View Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.coursecode}</strong> - {course.coursetitle}
          </li>
        ))}
      </ul>
    </div>
  );
}