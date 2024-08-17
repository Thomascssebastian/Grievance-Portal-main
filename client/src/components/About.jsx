import React, { useEffect, useState } from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const About = () => {
    const [userData, setUserData] = useState(null);

    const callAboutPage = async () => {
        try {
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (!res.ok) {
                const error = new Error(res.statusText);
                throw error;
            }
            const data = await res.json();
            setUserData(data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    useEffect(() => {
        callAboutPage();
    }, []);

    const containerStyle = {
        margin: '0 auto',
        padding: '2rem',
        maxWidth: '900px',
        fontFamily: 'Arial, sans-serif',
        
    };

    const innerContainerStyle = {
        backgroundColor: '#f4f4f9',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#333'
    };

    const headingStyle = {
        textAlign: 'center',
        margin: '1rem 0',
        color: '#5a5a5a',
        borderBottom: '2px solid #dcdcdc'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1rem 0',
    };

    const tableHeaderStyle = {
        backgroundColor: '#4a4a4a',
        color: '#fff',
        padding: '0.75rem',
        textAlign: 'left'
    };

    const tableCellStyle = {
        padding: '0.75rem',
        border: '1px solid #ddd',
        textAlign: 'left'
    };

    const contactStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem'
    };

    const imgStyle = {
        width: '24px',
        marginRight: '10px'
    };

    if (userData) {
        return (
            <div style={containerStyle} >
                <div style={innerContainerStyle}>
                    <h1 style={headingStyle}>My Profile</h1>
                    <form>
                        <h3 style={headingStyle}>Personal Information</h3>
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Address:</strong> {userData.address}</p>
                        
                        <h3 style={headingStyle}>Contact Information</h3>
                        <div style={contactStyle}>
                            <img src={phone} alt="Phone" style={imgStyle} />
                            <p><strong>Phone:</strong> {userData.phone}</p>
                        </div>
                        <div style={contactStyle}>
                            <img src={email} alt="Email" style={imgStyle} />
                            <p><strong>Email:</strong> {userData.email}</p>
                        </div>
                        
                        <h3 style={headingStyle}>Grievances</h3>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Date</th>
                                    <th style={tableHeaderStyle}>Department</th>
                                    <th style={tableHeaderStyle}>Grievance</th>
                                    <th style={tableHeaderStyle}>Status</th>
                                    <th style={tableHeaderStyle}>Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.grievances.map((cval, index) => (
                                    <tr key={index}>
                                        <td style={tableCellStyle}>{cval.date}</td>
                                        <td style={tableCellStyle}>{cval.dept}</td>
                                        <td style={tableCellStyle}>{cval.grievance}</td>
                                        <td style={tableCellStyle}>{cval.status}</td>
                                        <td style={tableCellStyle}>{cval.feedback}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div style={containerStyle}>
                <p style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', color: '#999' }}>
                    Unable to load data. Please log in.
                </p>
            </div>
        );
    }
}

export default About;
