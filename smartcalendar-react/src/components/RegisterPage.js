import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserProfile } from '../firestore';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      if(password !== confirmPassword){
        alert("Passwords don't match!");
        return;
      }
      // TODO: Add registration logic here tomorrow
      console.log("Registration logic to be implemented");
    } catch(error) {
      console.error("Error during registration:", error);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const titleStyle = {
    color: 'white',
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '30px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    marginBottom: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    color: '#667eea'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    opacity: '0.9'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Account</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
            Already have an account? 
          </span>
          <Link to="/login" style={linkStyle}> Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
