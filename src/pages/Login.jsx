import React, { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/index'; // Import the zustand store
import '../style/LoginStyle.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const {
    login, isLoading, error,
  } = useStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const emailPattern = /\.26@dartmouth\.edu$/; // Regular expression to check the email pattern
    // if (!emailPattern.test(form.email)) {
    //   setError('Email must end with .26@dartmouth.edu');
    //   return;
    // }

    try {
      console.log(form.email);
      console.log(form.password);
      const redirectUrl = await login(form.email, form.password); // Use the zustand login action
      console.log('redirectURL: ', redirectUrl);
      if (redirectUrl.redirect) {
        // navigate(redirectUrl.redirect);
        navigate('/profile');
      } else {
        message.error('Invalid email or password');
        // setError('Invalid email or password');
      }
    } catch (error2) {
      message.error('Invalid email or password');
      // setError('Invalid email or password');
    }
  };

  const handleRedirect = () => {
    navigate('/verifyEmail1');
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
                placeholder="...@dartmouth.edu"
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
                placeholder=""
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
          <h3>New user?</h3>
          <p onClick={handleRedirect}>Sign Up Here</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
