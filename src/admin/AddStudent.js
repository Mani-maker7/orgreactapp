import React, { useState } from 'react';
import axios from 'axios';
import config from "../config";


export default function AddStudent() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    studentid:'',
    studentname: '',
    gender: '',
    dateofbirth: '',
    program: '',
    department: '',
    semester: '',
    year:'',
    email: '',
    contact:''
   
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue = id === 'studentname' ? value.toUpperCase() : value;
    setFormData({ ...formData, [id]: newValue });
  };
  

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/addstudent`, formData);
      if (response.status === 200) 
      {
        setFormData({
          studentid:'',
    studentname: '',
    gender: '',
    dateofbirth: '',
    program: '',
    department: '',
    semester: '',
    year:'',
    email: '',
    contact:'',
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
    <div> <br/><br/><br/><br/>
      <h3 align="center"><u>Add Student</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID</label>
          <input type="number" id="studentid" value={formData.studentid} onChange={handleChange}  required />
        </div>
        <div>
          <label>Student Name</label>
          <input type="text" id="studentname" value={formData.studentname} onChange={handleChange} onKeyUp={handleChange} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Program</label>
          <select id="program" value={formData.program} onChange={handleChange} required>
            <option value="">---Select Program---</option>
            <option value="BTECH">B.Tech</option>
            <option value="MTECH">M.Tech</option>
            <option value="AGRI">Agriculture</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
          </select>
        </div>
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
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="text" id="contact" pattern="[6789][0-9]{9}" placeholder="Must be 10 Digits" value={formData.contact} onChange={handleChange} required />
        </div>
        
        
        <button type="submit">Add</button>
      </form>
    </div>
  );
}