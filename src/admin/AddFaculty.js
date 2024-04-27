import React, { useState } from 'react';
import axios from 'axios';
import config from "../config";



export default function AddFaculty() 
{
  //formData state variable
  const [formData, setFormData] = useState({
    facultyid:'',
    facultyname: '',
    gender: '',
    department: '',
     qualification: '',
     designation: '',
    email: '',
    contact:''
   
  });

  //message state variable
  const [message, setMessage] = useState('');
  //error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue = id === 'facultyname' ? value.toUpperCase() : value;
    setFormData({ ...formData, [id]: newValue });
  };
  

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post(`${config.url}/addfaculty`, formData);
      if (response.status === 200) 
      {
        setFormData({
         facultyid:'',
    facultyname: '',
    gender: '',
    department: '',
     qualification: '',
     designation: '',
    email: '',
    contact:''
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
    <div>  <br/><br/><br/><br/><br/><br/>
      <h3 align="center"><u>Add Faculty</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Faculty ID</label>
          <input type="number" id="facultyid" value={formData.facultyid} onChange={handleChange}  required />
        </div>
        <div>
          <label>Faculty Name</label>
          <input type="text" id="facultyname" value={formData.facultyname} onChange={handleChange} onKeyUp={handleChange} required />
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
          <label>Qualification</label>
          <select id="qualification" value={formData.qualification} onChange={handleChange} required>
            <option value="">---Select Your Qualification---</option>
            <option value="BTECH">B.Tech</option>
            <option value="MTECH">M.Tech</option>
            <option value="PHD">Ph.D</option>
          </select>
        </div>
         <div>
          <label>Designation</label>
          <select id="designation" value={formData.designation} onChange={handleChange} required>
            <option value="">---Select Your Designation---</option>
            <option value="Prof">Professor</option>
            <option value="Asst Prof">Assistant Professor</option>
            <option value="Assoc Prof">Associate Professor</option>
          </select>
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