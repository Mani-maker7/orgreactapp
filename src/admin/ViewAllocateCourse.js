// React Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
export default function ViewAllocationCourse() {
  const [allocations, setAllocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const response = await axios.get(
            `${config.url}/viewcoursefacultyallocation`
        );
        setAllocations(response.data);
      } catch (error) {
        setError("Error fetching data");
      }
    };
    fetchAllocations();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Course Faculty Allocations</h1>

      {error && <h4>{error}</h4>}
      <table border={1} align="center" style={{ width: "auto", height: "auto" }}>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Faculty Name</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allocations) && allocations.length > 0 ? (
            allocations.map((allocation, index) => (
              <tr key={index}>
                <td>{allocation.course}</td>
                <td>{allocation.faculty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}