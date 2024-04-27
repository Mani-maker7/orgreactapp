import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";


export default function ViewGrade() {
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    // Assuming you have an endpoint to fetch student grades
    axios.get(`${config.url}/student/viewresults`)
      .then(response => {
        setStudentGrades(response.data); // Assuming response.data is an array of grade objects
      })
      .catch(error => {
        console.error('Error fetching student grades:', error);
      });
  }, []);

  return (
    <div>
      <h2>Student Grades</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th> <br/><br/>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {studentGrades.map((grade, index) => (
            <tr key={index}>
              <td>{grade.subject}</td>
              <td>{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
