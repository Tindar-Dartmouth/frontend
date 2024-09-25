import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/index'; // Import the zustand store
import '../style/LoginStyle.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const {
    login, isLoading, error, setError,
  } = useStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /\.26@dartmouth\.edu$/; // Regular expression to check the email pattern
    if (!emailPattern.test(form.email)) {
      setError('Email must end with .26@dartmouth.edu');
      return;
    }

    try {
      console.log(form.email);
      console.log(form.password);
      const redirectUrl = await login(form.email, form.password); // Use the zustand login action
      console.log(redirectUrl);
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        setError('Invalid email or password');
      }
      // navigate('/recruiting');
    } catch (error2) {
      setError('Invalid email or password');
    }
  };

  const handleRedirect = () => {
    navigate('/register');
    console.log('going to register');
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                name="email"
                style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
                value={form.email}
                onChange={handleChange}
                placeholder="type your email"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                name="password"
                placeholder="type your password"
                style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="login-submit-button" disabled={isLoading} type="submit">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="direct-to-register">
          <h3>Or Sign Here</h3>
          <p onClick={handleRedirect}>Sign Up</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
