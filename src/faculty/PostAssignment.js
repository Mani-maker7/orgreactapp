import React, { useState, useRef } from 'react';
import axios from 'axios';
import config from '../config';

export default function PostAssignment() {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    date: '',
    dueDate: '',
    file: null
  });

  const fileInputRef = useRef(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('courseCode', formData.courseCode);
      formDataToSend.append('courseTitle', formData.courseTitle);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('dueDate', formData.dueDate);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`${config.url}/addassignment`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setFormData({
          courseCode: '',
          courseTitle: '',
          date: '',
          dueDate: '',
          file: null
        });
        fileInputRef.current.value = '';
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
      <h3 align="center"><u>Post Assignment</u></h3>
      {message ? <h4 align="center">{message}</h4> : null}
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Course Code</label>
          <input type="text" id="courseCode" value={formData.courseCode} onChange={handleChange} required />
        </div>
        <div>
          <label>Course Title</label>
          <input type="text" id="courseTitle" value={formData.courseTitle} onChange={handleChange} required />
        </div>
        <div>
          <label>Date</label>
          <input type="date" id="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Due Date</label>
          <input type="date" id="dueDate" value={formData.dueDate} onChange={handleChange} required />
        </div>
        <div>
          <label>File</label>
          <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}