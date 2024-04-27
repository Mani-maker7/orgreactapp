import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";

export default function ViewResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the results data from the backend
    axios.get(`${config.url}/student/results`)
      .then(response => {
        setResults(response.data); // Assuming response.data is an array of result objects
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching results:', error);
        setError('Error fetching results. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>View Results</h2>
      <table>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.assignment}</td>
              <td>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
