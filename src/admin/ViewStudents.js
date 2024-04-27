import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";



export default function ViewStudents() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewstudents`);
      setStudents(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (studentid) => {
   
    if(window.confirm("Are you sure want to delete this student?"))
    {
      try {
        await axios.delete(`${config.url}/deletestudent/${studentid}`);
        fetchStudents();
      } catch (error) {
        console.error(error.message);
      }
    }
    else
    {
      fetchStudents();
    }

   
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <br/><br/><br/><br/><br/>
      <h1>Students</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Program</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(students) && students.length > 0 ? (
    students.map((student, index) => (
      <tr key={index}>
        <td>{student.studentid}</td>
        <td>{student.studentname}</td>
        <td>{student.gender}</td>
        <td>{student.dateofbirth}</td>
        <td>{student.program}</td>
        <td>{student.department}</td>
        <td>{student.semester}</td>
        <td>{student.year}</td>
        <td>{student.email}</td>
        <td>{student.contact}</td>
        
        <td>
          <button onClick={() => deleteStudent(student.studentid)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="11" align='center'>Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}