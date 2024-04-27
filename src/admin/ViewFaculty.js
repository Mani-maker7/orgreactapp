import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";



export default function ViewFaculty() {
  const [faculty, setFaculty] = useState([]);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${config.url}/viewfaculty`);
      setFaculty(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchFaculty();
  }, []);

  const deleteFaculty = async (facultyid) => {
   
    if(window.confirm("Are you sure want to delete this student?"))
    {
      try {
        await axios.delete(`${config.url}/deletefaculty/${facultyid}`);
        fetchFaculty();
      } catch (error) {
        console.error(error.message);
      }
    }
    else
    {
      fetchFaculty();
    }

   
  }

  return (
    <div style={{ textAlign: 'center' }}>

<br/> <br/> <br/> <br/> <br/> <br/> 
      <h1>Faculty</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }}>
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Faculty Name</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Qualification</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(faculty) && faculty.length > 0 ? (
    faculty.map((fac, index) => (
      <tr key={index}>
        <td>{fac.facultyid}</td>
        <td>{fac.facultyname}</td>
        <td>{fac.gender}</td>
        <td>{fac.department}</td>
        <td>{fac.qualification}</td>
        <td>{fac.designation}</td>
        <td>{fac.email}</td>
        <td>{fac.contact}</td>
        
        <td>
          <button onClick={() => deleteFaculty(fac.facultyid)} className='button'>Delete</button>
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