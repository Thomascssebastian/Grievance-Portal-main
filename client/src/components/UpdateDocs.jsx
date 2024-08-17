import React, { useState } from 'react';

const UpdateDocs = () => {
  const [gId, setGId] = useState('');
  const [_id, setMId] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');
  const [status, setStatus] = useState('');
  const [feedback, setFeedback] = useState('');
  const [Data, setData] = useState({});

  const getGrievance = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/grievancelist', {
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
      const obj = thisGrievance(data);
      setData(obj);
      setEmail(obj.email);
      setDept(obj.dept);
    } catch (err) {
      console.error(err);
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/aAbBcC/updatedocs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email, dept, _id, gId, status, feedback
        }),
      });
      if (res.status === 400 || !await res.json()) {
        window.alert("Could not connect to backend");
      } else {
        window.alert("Grievance Updated Successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const thisGrievance = (d) => {
    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < d[i].grievances.length; j++) {
        if (d[i].grievances[j]._id === gId) {
          setMId(d[i]._id);
          return d[i].grievances[j];
        }
      }
    }
    return {};
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Grievances</h1>
      <hr />
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <form>
          <label htmlFor="GId" style={{ display: 'block', marginBottom: '10px' }}>Enter the Grievance Id:</label>
          <input
            type="text"
            id="GId"
            name="GId"
            value={gId}
            onChange={(e) => setGId(e.target.value)}
            style={{ marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
          />
          <button
            type="submit"
            onClick={getGrievance}
            style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
          >
            Get Data
          </button>
        </form>
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ textDecoration: 'underline', marginBottom: '10px' }}>Grievance Information</h4>
          <div style={{ marginBottom: '10px' }}>
            <h6 style={{ display: 'inline', marginRight: '10px' }}>Name:</h6>
            <p style={{ display: 'inline' }}>{Data.name}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h6 style={{ display: 'inline', marginRight: '10px' }}>Phone:</h6>
            <p style={{ display: 'inline' }}>{Data.phone}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <h6 style={{ display: 'inline', marginRight: '10px' }}>Grievance:</h6>
            <p style={{ display: 'inline' }}>{Data.grievance}</p>
          </div>
          <form>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Email:</h6>
              <p style={{ display: 'inline' }}>{email}</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Department:</h6>
              <p style={{ display: 'inline' }}>{dept}</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>ID:</h6>
              <input
                type="text"
                value={_id}
                readOnly
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Main ID:</h6>
              <input
                type="text"
                value={gId}
                readOnly
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Status:</h6>
              <select
                name="status"
                id="status"
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              >
                <option value="Not Seen">Not Seen</option>
                <option value="In Process">In Process</option>
                <option value="Referred to concerned Authority">Referred to concerned Authority</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Feedback:</h6>
              <input
                type="text"
                name="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <h6 style={{ display: 'inline', marginRight: '10px' }}>Date of Filing:</h6>
              <p style={{ display: 'inline' }}>{Data.date}</p>
            </div>
            <button
              type="submit"
              onClick={updateData}
              style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
            >
              Update Status
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDocs;
