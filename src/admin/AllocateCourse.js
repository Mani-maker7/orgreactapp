import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";


export default function AllocateCourse() {
  const [formData, setFormData] = useState({
    courseId: "",
    facultyId: "",
    
  });
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${config.url}/viewcourses`);
        setCourses(response.data);
      } catch (error) {
        setError("Error fetching courses");
      }
    };

    const fetchFaculties = async () => {
      try {
        const response = await axios.get(`${config.url}/viewfaculty`);
        setFaculties(response.data);
      } catch (error) {
        setError("Error fetching faculties");
      }
    };

    

    fetchCourses();
    fetchFaculties();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.url}/allocatecourse`,
        formData
      );
      alert(response.data); // Show success message
      setError("");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div> <br/> <br/> <br/> <br/> <br/> 
      <h2 align="center">Allocate Faculty to Course</h2>
      {error && <h4>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="courseId" className="white-label">Course:</label>
          <select id="courseId" value={formData.courseId} onChange={handleChange} required>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course.coursecode}>{course.coursetitle}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="facultyId" className="white-label">Faculty:</label>
          <select id="facultyId" value={formData.facultyId} onChange={handleChange} required>
            <option value="">Select Faculty</option>
            {faculties.map(faculty => (
              <option key={faculty._id} value={faculty.facultyid}>{faculty.facultyname}</option>
            ))}
          </select>
        </div>
        <button type="submit">Allocate</button>
      </form>
    </div>
  );
}