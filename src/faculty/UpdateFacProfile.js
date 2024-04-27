import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './faculty.css';
import config from "../config";

export default function UpdateFacProfile() {
  const [facultyData, setFacultyData] = useState({
    facultyid: '',
    facultyname: '',
    gender: '',
    department: '',
    qualification: '',
    designation: '',
    email: '',
    password: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialFacultyData, setInitialFacultyData] = useState({});

  useEffect(() => {
    const storedFacultyData = localStorage.getItem('faculty');
    if (storedFacultyData) {
      const parsedFacultyData = JSON.parse(storedFacultyData);
      setFacultyData(parsedFacultyData);
      setInitialFacultyData(parsedFacultyData);
    }
  }, []);

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in facultyData) {
        if (facultyData[key] !== initialFacultyData[key] && initialFacultyData[key] !== '') {
          updatedData[key] = facultyData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = facultyData.email;
        const response = await axios.put(`${config.url}/updatefacultyprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/facultyprofile/${facultyData.email}`, updatedData);
        localStorage.setItem("faculty", JSON.stringify(res.data));
      } else {
        // No changes
        setMessage("No Changes in Faculty Profile");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Update Profile</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Faculty ID</label>
          <input type="text" id="facultyid" value={facultyData.facultyid} onChange={handleChange} required />
        </div>
        <div>
          <label>Faculty Name</label>
          <input type="text" id="facultyname" value={facultyData.facultyname} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" id="gender" value={facultyData.gender} onChange={handleChange} required />
        </div>
        <div>
          <label>Department</label>
          <input type="text" id="department" value={facultyData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Qualification</label>
          <input type="text" id="qualification" value={facultyData.qualification} onChange={handleChange} required />
        </div>
        <div>
          <label>Designation</label>
          <input type="text" id="designation" value={facultyData.designation} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={facultyData.email} readOnly />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={facultyData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={facultyData.contact} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
