import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './student.css';
import config from "../config";

export default function ViewAssignments() {
  const [assignment, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:2527/viewassignments');
      setAssignments(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h1 align="center">Assignments</h1>
      <table border={1} align="center">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Files</th>


            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {assignment.length > 0 ? (
            assignment.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.courseCode}</td>
                <td>{assignment.courseTitle}</td>
                <td>{assignment.date}</td>
                <td>{assignment.dueDate}</td>
                <td>
  {assignment.file.endsWith('.jpg') || assignment.file.endsWith('.jpeg') || assignment.file.endsWith('.png') ? (
    <img src={`${config.url}/assignmentimage/${assignment.file}`} alt="Assignment" style={{ width: '250px', height: '250px' }} />
  ) : (
    <a href={`${config.url}/assignmentimage/${assignment.file}`}>Click Here</a>
  )}
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" align="center">No assignments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
