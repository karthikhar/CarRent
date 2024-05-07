import React, { useState } from 'react';
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateUsername = () => {
    if (!username) {
      setUsernameError('Username is required');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUsername() && validateEmail() && validatePassword()) {
      axios.post("http://localhost:3000/register", { username, email, password })
        .then(result => {
          console.log(result);
          navigate("/login");
        })
        .catch(err => console.log(err));
    }
  };

  

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h3 className='text-center custom-color custom-font'>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Username</strong></label>
            <input
              type="text"
              placeholder="Enter Username"
              autoComplete='off'
              name='email'
              className='form-control rounded-4'
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="text-danger">{usernameError}</div>
          </div>

          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete='off'
              name='email'
              className='form-control rounded-4'
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-danger">{emailError}</div>
          </div>

          <div className='mb-3'>
            <label htmlFor="email"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              name='password'
              className='form-control rounded-4'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-danger">{passwordError}</div>
          </div>

          <div className='text-center'>
            <button type="submit" className='btn btn-primary w- rounded-5'>Sign Up</button>
            <p>Already have an account?
              <Link to="/login" className='  w-50   text-decoration-none'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
