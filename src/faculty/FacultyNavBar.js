import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './faculty.css';
import '../main/style.css'
import FacultyHome from './FacultyHome';
import FacultyProfile from './FacultyProfile';
import UpdateFacProfile from './UpdateFacProfile';
import ViewGrade from './ViewGrade';
import PostAssignment from './PostAssignment';
import PostAttendance from './PostAttendance';
import ViewAssignments from './ViewAssignments';
import ChangeFacultyPwd from './ChangeFacultyPwd';


export default function FacultyNavBar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isFacultyLoggedIn');
    localStorage.removeItem('faculty');
    navigate('/facultylogin');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <nav className="navbar">
        <br />
        <br />
        <br />
        <br />
        <ul>
          <li>
            <Link to="/facultyhome">Home</Link>
          </li>
          <li><Link to="/changefacultypwd">Change Password</Link></li>
          <li className={isDropdownOpen ? 'dropdown active' : 'dropdown'} onClick={toggleDropdown}>
            <span>
              Course Contains <i className={isDropdownOpen ? 'arrow up' : 'arrow down'}></i>
            </span>
            <div className="dropdown-content">
              <Link to="/postattendance">Attendance</Link>
              <Link to="/viewgrade">View Grades</Link>
            </div>
            </li>
          <li className="dropdown">
            <Link>Assignments</Link>
            <div className="dropdown-content">
                 <Link to="/postassignment">Add Assignments</Link>
                 <Link to="/viewassignments">View Assignments</Link>
            </div>
          </li>
          

          <li className="dropdown">
            <Link to="/facultyprofile">Profile</Link>
            <div className="dropdown-content">
              <Link to="/facultyprofile">View Profile</Link>
              <Link to="/updatefacultyprofile">Update Profile</Link>
            </div>
          </li>   <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        
          <li>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="content-container">
        <Routes>
          <Route path="/facultyhome" element={<FacultyHome />} exact />
          <Route path="/facultyprofile" element={<FacultyProfile />} exact />
          <Route path="/updatefacultyprofile" element={<UpdateFacProfile />} exact />
          <Route path="/changefacultypwd" element={<ChangeFacultyPwd/>} exact />
          <Route path="/postattendance" element={<PostAttendance />} exact />
          <Route path="/postassignment" element={<PostAssignment />} exact />
          <Route path="/viewassignments" element={<ViewAssignments />} exact />
          <Route path="/viewgrade" element={<ViewGrade />} exact />
        </Routes>
      </div>
    </div>
  );
}
