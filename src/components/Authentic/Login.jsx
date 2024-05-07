import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    try {
      if (!email) {
        setEmailError('Email is required');
        return;
      }

      if (!password) {
        setPasswordError('Password is required');
        return;
      }

      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { user } = response.data; 
      const { _id } = user;
      localStorage.setItem('userId', _id);
      localStorage.setItem('loggedIn', true);
      navigate('/home/' + email);
      window.location.reload();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setGeneralError('Invalid email or password');
      } else {
        setGeneralError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25 h-60">
        <h3 className="text-center custom-color custom-font">Login</h3>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-danger">{passwordError}</div>
          </div>
          <div className="text-danger">{generalError}</div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary rounded-5 w-45">Login</button>
          </div>
        </form>
        <p className="text-center">Don't have an account? <Link to="/register" className="w-50 bg-light text-decoration-none">Sign up</Link></p>

        <p className="text-center">Login As Admin <Link to="/adminLogin" className="w-50 bg-light text-decoration-none">Login</Link></p>

      </div>
    </div>
  );
}

export default Login;
