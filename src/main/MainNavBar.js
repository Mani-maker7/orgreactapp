import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import './style.css';

import FacultyLogin from '../faculty/FacultyLogin'
import StudentLogin from '../student/StudentLogin'
import AdminLogin from '../admin/AdminLogin'



export default function MainNavBar({ onAdminLogin,onFacultyLogin,onStudentLogin }) {
  return (
    <div className="photo-icon">
      <nav>
        
      <ul >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li className="dropdown">
            <Link>Login</Link>
            <div className="dropdown-content">
              <Link to="/facultylogin">Faculty Login</Link>
              <Link to="/studentlogin">Student Login</Link>
              <Link to="/adminlogin">Admin Login</Link>
            </div>
          </li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/about" element={<About/>} exact />
        <Route path="/facultylogin" element={<FacultyLogin onFacultyLogin={onFacultyLogin}/>} exact />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin}/>} exact />
        <Route path="/studentlogin" element={<StudentLogin onStudentLogin={onStudentLogin}/>} exact />
        <Route path="/contact" element={<Contact/>} exact />
        
      </Routes>
    </div>
  );
}