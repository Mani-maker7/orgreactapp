import React from 'react'
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './student.css'
import '../main/style.css'

import StudentHome from './StudentHome';
import StudentProfile from './StudentProfile';
import ViewResults from './ViewResults';
import ViewCourses from './ViewCourses';
import ViewAttendance from './ViewAttendance';
import ViewAssignments from './ViewAssignments';
import CourseRegistration from './CourseRegistration';

export default function StudentNavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('student');

    navigate('/studentlogin');
    window.location.reload()
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center', // Horizontal centering
      alignItems: 'center', // Vertical centering
      minHeight: '50vh', // Ensure at least viewport height
      padding: '20px', // Add padding around the content
    }}>
  
    <nav className="navbar">
  <ul>  
    <Link to="/studenthome">Home</Link> <br/><br/><br/>

    <Link to="/courseregistration">Course Registration</Link> <br/><br/><br/>

    <Link to="/studentprofile">Student Profile</Link> <br/><br/><br/>
    <li className="dropdown">
      <Link>CourseDetails</Link>
      <div className="dropdown-content">
        <Link to="/viewcourses">Assigned Courses</Link>
        <Link to="/viewresult">Results</Link>
        <Link to="/viewattendance">Attendance</Link>
      </div> <br/><br/><br/>
    </li>  <br/><br/>

    <li className="dropdown"> 
            
                 <Link to="/viewassignments">Take Assignments</Link>
            
          </li>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
  </ul>
</nav>

  
      <Routes>
        <Route path="/studenthome" element={<StudentHome />} exact />
        <Route path="/courseregistration" element={<CourseRegistration />} exact />
        <Route path="/studentprofile" element={<StudentProfile />} exact />
        <Route path="/viewcourses" element={<ViewCourses />} exact />
        <Route path="/viewresult" element={<ViewResults />} exact />
        <Route path="/viewattendance" element={<ViewAttendance />} exact />
        <Route path="/viewassignments" element={<ViewAssignments />} exact />
      </Routes>
  
    </div>
  )
}  