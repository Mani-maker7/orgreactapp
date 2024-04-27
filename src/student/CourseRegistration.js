import React, { useState } from 'react';
import axios from 'axios';
import config from "../config";

export default function CourseRegistration() {
  const [formData, setFormData] = useState({
    coursecode: '',
    coursetitle: '',
    department: '',
    academicyear: '',
    semester: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/registercourse`, formData);
      if (response.status === 200) {
        setFormData({
          coursecode: '',
          coursetitle: '',
          department: '',
          academicyear: '',
          semester: ''
        });
      }
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Course Registration</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{ color: "red" }}>{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course Code</label>
          <input type="text" id="coursecode" value={formData.coursecode} onChange={handleChange} required />
        </div>
        <div>
          <label>Course Title</label>
          <input type="text" id="coursetitle" value={formData.coursetitle} onChange={handleChange} required />
        </div>
        <div>
          <label>Department</label>
          <input type="text" id="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label>Academic Year</label>
          <input type="text" id="academicyear" value={formData.academicyear} onChange={handleChange} required />
        </div>
        <div>
          <label>Semester</label>
          <input type="text" id="semester" value={formData.semester} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}