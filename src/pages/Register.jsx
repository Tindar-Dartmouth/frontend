import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { register } from '../services/authService';
import '../style/RegisterStyle.css';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   await register(form);
      console.log('Successfuly registration');
      navigate('/login');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {/* <p className="sub-header">Save your password! You will not be able to reset</p> */}
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        </div> */}
        <div className="form-group">
          <label htmlFor="email">
            Dartmouth Email:
            <input
              type="email"
              id="email"
              name="email"
              style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {/* <div className="form-group">
          <label htmlFor="role">
            Role
            <input type="text" id="role" name="role" value={form.role} onChange={handleChange} required />
          </label>
        </div> */}
        {error && <p className="error">{error}</p>}
        <button className="register-button-submit" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
