import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GrievanceStatus = () => {
  const [array, setArray] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("/grievancelist", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      const arr = getlist(data);
      setArray(arr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getlist = (d) => {
    let Gdata = [];
    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < d[i].grievances.length; j++) {
        Gdata.push(d[i].grievances[j]);
      }
    }
    return Gdata;
  };

  return (
    <>
      <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Grievance Status</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#343a40', color: '#fff' }}>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Names</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Phone</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Department</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Grievance</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Feedback</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {array.map((cval) => (
              <tr key={cval._id}>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval._id}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.name}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.email}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.phone}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.dept}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.grievance}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.status}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.feedback}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{cval.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}>
          <Link to="/aAbBcC/updatedocs" className="btn btn-outline-primary mx-2">Update Documents</Link>
          <Link to="/login" className="btn btn-outline-warning mx-2">Logout as Admin</Link>
        </div>
        <p style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '20px' }}>
          Note: Copy the grievance ID to update.
        </p>
      </div>
    </>
  );
};

export default GrievanceStatus;
