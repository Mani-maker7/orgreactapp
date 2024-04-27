import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";



export default function ViewCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcourses`);
      setCourses(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (coursecode) => {
   
    if(window.confirm("Are you sure want to delete this Course?"))
    {
      try {
        await axios.delete(`${config.url}/deletecourse/${coursecode}`);
        fetchCourses();
      } catch (error) {
        console.error(error.message);
      }
    }
    else
    {
      fetchCourses();
    }

   
  }

  return (
   <div style={{ textAlign: 'center' }}>
      <h1>Courses</h1>
      <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead> 
            <tr>
              
              <th>Department</th>
              <th>Academic Year</th>
              <th>Semester</th>
              <th>Year</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(courses) && courses.length > 0 ? (
    courses.map((c, index) => (
      <tr key={index}>
        
        <td>{c.department}</td>
         <td>{c.academicyear}</td>
        <td>{c.semester}</td>
        <td>{c.year}</td>
        <td>{c.coursecode}</td>
        <td>{c.coursetitle}</td>
        
        <td>
          <button onClick={() => deleteCourse(c.coursecode)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="10" align='center'>Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}