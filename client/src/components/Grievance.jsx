import React, { useEffect, useState } from 'react';
import phone from '../images/telephone.png';
import email from '../images/email.png';
import address from '../images/address.png';

const Grievance = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        dept: "",
        grievance: ""
    });

    const userContact = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
            if (!res.ok) {
                const error = new Error(res.statusText);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        userContact();
    }, []);

    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserData({ ...userData, [name]: value });
    };

    const fileGrievance = async (event) => {
        event.preventDefault();
        const { name, email, phone, dept, grievance } = userData;
        const res = await fetch("/grievance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone, dept, grievance })
        });

        const data = await res.json();
        if (!data) {
            console.log("Grievance Not Filed");
            window.alert("Try to relogin. Your grievance was not filed!");
        } else {
            alert("Grievance Filed Successfully!! We'll inform you when there will be a response");
            setUserData({ ...userData, grievance: "" });
        }
    };

    const containerStyle = {
        margin: '0 auto',
        padding: '2rem',
        maxWidth: '900px',
        fontFamily: 'Arial, sans-serif',
    };

    const formStyle = {
      backgroundColor: '#f4f4f9',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: '#fff'
    };

    const headingStyle = {
        textAlign: 'center',
        margin: '1rem 0',
        color: '#333',
        borderBottom: '2px solid #dcdcdc'
    };

    const inputStyle = {
        margin: '0.5rem 0',
        padding: '0.75rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100%'
    };

    const selectStyle = {
        margin: '0.5rem 0',
        padding: '0.75rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100%',
        backgroundColor: '#fff'
    };

    const textareaStyle = {
        margin: '0.5rem 0',
        padding: '0.75rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '100%'
    };

    const buttonStyle = {
        backgroundColor: '#4a4a4a',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <div style={formStyle}>
                <h2 style={headingStyle}>File a Grievance</h2>
                <form method="POST" onSubmit={fileGrievance}>
                    <input
                        type="text"
                        name="name"
                        onChange={handleInputs}
                        placeholder="Your Name"
                        style={inputStyle}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        onChange={handleInputs}
                        placeholder="Your Email"
                        style={inputStyle}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        onChange={handleInputs}
                        placeholder="Your Phone Number"
                        style={inputStyle}
                        required
                    />
                    <label htmlFor="dept" style={{color: '#333' }}>Choose a department:</label>
                    <select
                        name="dept"
                        id="dept"
                        onChange={handleInputs}
                        style={selectStyle}
                    >
                        <option value="">--Select department--</option>
                        <option value="Education">Education</option>
                        <option value="Health Ministry">Health Ministry</option>
                        <option value="Service Provider">Service Provider</option>
                        <option value="Others">Others</option>
                    </select>
                    <textarea
                        name="grievance"
                        placeholder="Your Message Here"
                        onChange={handleInputs}
                        value={userData.grievance}
                        style={textareaStyle}
                        rows="5"
                    ></textarea>
                    <p style={{ color: '#333' }}>Upload Supporting Document Here:</p>
                    <input type="file" style={{ color: '#333' }} />
                    <button type="submit" style={buttonStyle}>Submit Grievance</button>
                </form>
            </div>
        </div>
    );
}

export default Grievance;
