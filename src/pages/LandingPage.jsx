import React from 'react';
// import Stack from '@mui/material/Stack';
import { Flex } from 'antd';
// import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../style/LandingPageStyle.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleClickRegister = () => {
    navigate('/verifyEmail1');
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        {/* <h1>Tindar</h1> */}
        <img src="/tindar_logo.png" alt="" />
        <h2>Strictly Business</h2>
      </div>
      <div className="register-login-buttons">
        <Flex gap="large" wrap>
          <button className="login-button" onClick={handleClickLogin} type="button">Login</button>
          <button className="register-button" type="button" onClick={handleClickRegister}>Register</button>
        </Flex>
      </div>
    </div>
  );
}

export default LandingPage;
