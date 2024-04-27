import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavBar from './main/MainNavBar';
import StudentNavBar from './student/StudentNavBar';
import FacultyNavBar from './faculty/FacultyNavBar'
import AdminNavBar from './admin/AdminNavBar';


export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const facultyLoggedIn = localStorage.getItem('isFacultyLoggedIn') === 'true';
    const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    
    setIsAdminLoggedIn(adminLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
  }, []);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onFacultyLogin = () => {
    localStorage.setItem('isFacultyLoggedIn', 'true');
    setIsFacultyLoggedIn(true);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        {isAdminLoggedIn ? (
          <AdminNavBar/>
        ) : isFacultyLoggedIn ? (
          <FacultyNavBar />
        ) : isStudentLoggedIn ? (
          <StudentNavBar/>
        ) : (
          <MainNavBar
          onAdminLogin={onAdminLogin}            
            onFacultyLogin={onFacultyLogin}
            onStudentLogin={onStudentLogin}
          />
            
        
        )}
      </Router>
    </div>
  );
}