import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  
  const [adminloggedIn, setadminLoggedIn] = useState(false);

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setGeneralError('Please provide a valid email and password');
      return;
    }

    axios.post('http://localhost:3000/adminLogin', { email, password })
      .then(() => {
        navigate('/home/'+email);
        localStorage.setItem('adminloggedIn', true);
        setadminLoggedIn(true);
        window.location.reload();
        
      })
      .catch(error => {
        setGeneralError('Admin Not Found');
        console.error('Error:', error);
      });
  };

  if (adminloggedIn) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25 h-60">
        <h3 className="text-center custom-color custom-font">Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-4"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
                setGeneralError('');
              }}
            />
            <div className="text-danger">{emailError}</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control w-55 rounded-4"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
                setGeneralError('');
              }}
            />
            <div className="text-danger">{passwordError}</div>
          </div>
          <div className="text-danger">{generalError}</div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary rounded-5 w-45">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
