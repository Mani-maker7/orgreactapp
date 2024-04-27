import React, { useState } from 'react';
import axios from 'axios';
import config from "../config";



export default function AddCourse() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    
    department: '',
    academicyear: '',
    semester: '',
    year:'',
    coursecode: '',
    coursetitle:''
   
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue = id === 'coursecode' ? value.toUpperCase() : value;
    setFormData({ ...formData, [id]: newValue });
  };
  

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/addcourse`, formData);
      if (response.status === 200) 
      {
        setFormData({
          department: '',
    academicyear: '',
    semester: '',
    year:'',
    coursecode: '',
    coursetitle:''
        });
      }
      setMessage(response.data);
      setError('');
    } 
    catch(error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  return (
    <div>   <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
      <h3 align="center"><u>Add Course</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <form onSubmit={handleSubmit}>
    
        <div>
          <label>Department</label>
          <select  id="department" value={formData.department} onChange={handleChange} required >
           <option value="">---Select Department---</option>
            <option value="CSE-HONORS">CSE-H</option>
            <option value="CSE-Reg">CSE-R</option>
            <option value="CSIT">CS&IT</option>
            <option value="AIDS">AI&DS</option>
            <option value="ECE">ECE</option>
            </select>
        </div>
       <div>
          <label>Academic Year</label>
          <select id="academicyear" value={formData.academicyear} onChange={handleChange} required>
            <option value="">--Select Academic Year--</option>
            <option value="23-24">2023-2024</option>
            <option value="24-25">2024-2025</option>
          </select>
        </div>
        <div>
          <label>Semester</label>
          <select id="semester" value={formData.semester} onChange={handleChange} required>
            <option value="">--Select Semester--</option>
            <option value="ODD">ODD SEM</option>
            <option value="EVEN">EVEN SEM</option>
          </select>
        </div>
        <div>
          <label>Year</label>
          <input type="number" id="year" value={formData.year} onChange={handleChange} required />
        </div>
        <div>
          <label>Course Code</label>
          <input type="text" id="coursecode" value={formData.coursecode} onChange={handleChange} onKeyUp={handleChange} required />
        </div>
        <div>
          <label>Course Title</label>
          <input type="text" id="coursetitle" value={formData.coursetitle} onChange={handleChange}  required />
        </div>
        
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
}