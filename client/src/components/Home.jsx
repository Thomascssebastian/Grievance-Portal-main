import React from 'react';
import { useEffect, useState } from 'react';
import tt from '../images/tt.jpg';

const Home = () => {
    const [userName, setUserName] = useState();
    const [show,setShow] = useState(false);

    const userHome = async () => {
        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUserName(data.name);
            setShow(true);
            if (!res.status === 200) {
                const error = new Error(res.err);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        userHome();
    }, []);

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        padding: '40px',
        textAlign: 'center',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '15px'
    };

    const imageContainerStyle = {
        maxWidth: '800px', // Increased width
        marginBottom: '20px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)'
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block'
    };

    const textStyle = {
        fontSize: '28px',
        color: '#495057',
        marginTop: '20px',
        fontWeight: '600',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        letterSpacing: '0.5px'
    };

    const buttonStyle = {
        marginTop: '30px',
        padding: '12px 30px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <div style={imageContainerStyle}>
                <img src={tt} alt="not found" style={imageStyle} />
            </div>
            <p style={textStyle}>
                {userName ? `Hello ${userName}! Welcome Back!!` : 'Please Login to submit a grievance.'}
            </p>
            
        </div>
    );
};

export default Home;
