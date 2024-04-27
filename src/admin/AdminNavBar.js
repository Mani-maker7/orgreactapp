import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './admin.css';

import AdminHome from './AdminHome';
import AddStudent from './AddStudent';
import ViewStudents from './ViewStudents';
import ChangeAdminPwd from './ChangeAdminPwd';
import ViewFaculty from './ViewFaculty';
import AddFaculty from './AddFaculty';
import AddCourse from './AddCourse';
import ViewCourses from './ViewCourses';
import AllocateCourse from './AllocateCourse'
import ViewAllocateCourse from './ViewAllocateCourse';

export default function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload()
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/adminhome">Home</Link></li>
          <li><Link to="/changeadminpwd">Change Password</Link></li>
          <li className="dropdown">
            <Link>Faculty</Link>
            <div className="dropdown-content">
            <Link to="/addfaculty">Add Faculty</Link>
              <Link to="/viewfaculty">View Faculty</Link> 
            </div>
          </li>
          <li className="dropdown">
            <Link>Student</Link>
            <div className="dropdown-content">
                 <Link to="/addstudent">Add Student</Link>
                 <Link to="/viewstudents">View Students</Link>
            </div>
          </li>
          <li className="dropdown">
            <Link>Course</Link>
            <div className="dropdown-content">
                 <Link to="/addcourse">Add Course</Link>
                 <Link to="/viewcourses">View Courses</Link>
                 <Link to="/allocatecourse">Course Allocation</Link>
                 <Link to="/viewallocate">View Allocation</Link>

            </div>
          </li>
                    <li><button className="logoutButton" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/viewfaculty" element={<ViewFaculty />} exact />
        <Route path="/addstudent" element={<AddStudent />} exact />
        <Route path="/viewstudents" element={<ViewStudents/>} exact />
        <Route path="/changeadminpwd" element={<ChangeAdminPwd/>} exact />
        <Route path="/viewcourses" element={<ViewCourses/>} exact />
        <Route path="/addfaculty" element={<AddFaculty/>} exact />
        <Route path="/addcourse" element={<AddCourse/>} exact />
        <Route path="/allocatecourse" element={<AllocateCourse/>} exact />
        <Route path="/viewallocate" element={<ViewAllocateCourse/>} exact />

      </Routes>
    </div>
  );
}